import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:mobile/services/api_service.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  group('ApiService Auth Tests', () {
    test('register success returns true and data', () async {
      final mockClient = MockClient((request) async {
        // Cek URL endpoint
        expect(request.url.toString(), '${ApiService.baseUrl}/auth/register');
        
        return http.Response(
          json.encode({
            'success': true,
            'data': {'id': 'user-1', 'email': 'test@test.com'}
          }),
          201,
        );
      });

      final result = await ApiService.register(
        'Test User', 'test@test.com', 'password123', '08123456789',
        client: mockClient,
      );

      expect(result['success'], true);
      expect(result['data']['email'], 'test@test.com');
      expect(result['data']['id'], 'user-1');
    });

    test('register failed returns false and error message', () async {
      final mockClient = MockClient((request) async {
        return http.Response(
          json.encode({
            'success': false,
            'message': 'Email sudah digunakan'
          }),
          400,
        );
      });

      final result = await ApiService.register(
        'Test User', 'test@test.com', 'password123', '08123456789',
        client: mockClient,
      );

      expect(result['success'], false);
      expect(result['message'], 'Email sudah digunakan');
    });

    test('register exception handles properly', () async {
      final mockClient = MockClient((request) async {
        throw Exception('Network error');
      });

      final result = await ApiService.register(
        'Test User', 'test@test.com', 'password123', '08123456789',
        client: mockClient,
      );

      expect(result['success'], false);
      expect(result['message'], 'Gagal terhubung ke server');
    });
  });

  group('ApiService Booking Tests', () {
    test('createBooking success returns data', () async {
      final mockClient = MockClient((request) async {
        expect(request.url.toString(), '${ApiService.baseUrl}/bookings');
        final body = json.decode(request.body);
        expect(body['layananId'], 'layanan-1');
        expect(body['eventDate'], '2026-12-31');
        
        return http.Response(
          json.encode({
            'success': true,
            'data': {'id': 'booking-1', 'status': 'PENDING'}
          }),
          201,
        );
      });

      final result = await ApiService.createBooking(
        'layanan-1', '2026-12-31', 'Jakarta', 'Catatan khusus',
        client: mockClient,
      );

      expect(result['success'], true);
      expect(result['data']['id'], 'booking-1');
    });

    test('createBooking fail returns error message', () async {
      final mockClient = MockClient((request) async {
        return http.Response(
          json.encode({
            'success': false,
            'message': 'Layanan tidak ditemukan'
          }),
          404,
        );
      });

      final result = await ApiService.createBooking(
        'layanan-1', '2026-12-31', 'Jakarta', 'Catatan khusus',
        client: mockClient,
      );

      expect(result['success'], false);
      expect(result['message'], 'Layanan tidak ditemukan');
    });

    test('getBookings success returns list of bookings', () async {
      final mockClient = MockClient((request) async {
        expect(request.url.toString(), '${ApiService.baseUrl}/bookings');
        
        return http.Response(
          json.encode({
            'success': true,
            'data': [
              {'id': 'b1', 'status': 'PENDING'},
              {'id': 'b2', 'status': 'CONFIRMED'}
            ]
          }),
          200,
        );
      });

      final result = await ApiService.getBookings(client: mockClient);

      expect(result['success'], true);
      expect(result['data'].length, 2);
      expect(result['data'][0]['id'], 'b1');
    });

    test('getBookings fails with 401 returns unauthorized message', () async {
      final mockClient = MockClient((request) async {
        return http.Response(
          json.encode({
            'success': false,
            'message': 'Unauthorized'
          }),
          401,
        );
      });

      final result = await ApiService.getBookings(client: mockClient);

      expect(result['success'], false);
      expect(result['message'], 'Unauthorized');
    });

    test('getBookings catches exception and returns connection error', () async {
      final mockClient = MockClient((request) async {
        throw Exception('Network Down');
      });

      final result = await ApiService.getBookings(client: mockClient);

      expect(result['success'], false);
      expect(result['message'], 'Gagal terhubung ke server');
    });
  });
}
