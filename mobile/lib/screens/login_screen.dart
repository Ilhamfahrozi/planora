import 'package:flutter/material.dart';
import '../services/api_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isPasswordVisible = false;

  // Controller untuk menangkap teks input
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  bool _isLoading = false;

  Future<void> _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Email dan password wajib diisi')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    final result = await ApiService.login(email, password);

    if (!mounted) return;

    setState(() {
      _isLoading = false;
    });

    if (result['success'] == true) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Login berhasil!')),
      );
      // Navigasi ke home
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(result['message'] ?? 'Login gagal')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 24.0,
              vertical: 60.0,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Avatar Profil
                Center(
                  child: CircleAvatar(
                    radius: 50,
                    backgroundColor: const Color(0xFFF9E5E1),
                    child: const Icon(
                      Icons.person,
                      size: 50,
                      color: Color(0xFF86796A),
                    ),
                  ),
                ),
                const SizedBox(height: 40),

                // Teks Selamat Datang
                const Text(
                  'Selamat Datang',
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF7A6A58),
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                const Text(
                  'Silakan masuk ke akun Anda',
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 48),

                // Input Email / Nama Pengguna
                TextFormField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    hintText: 'Email / Nama Pengguna',
                    hintStyle: const TextStyle(color: Colors.grey),
                    prefixIcon: const Icon(
                      Icons.email_outlined,
                      color: Colors.grey,
                    ),
                    filled: true,
                    fillColor: const Color(0xFFFAFAFA),
                    contentPadding: const EdgeInsets.symmetric(vertical: 18),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFEAEAEA)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFEAEAEA)),
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // Input Password
                TextFormField(
                  controller: _passwordController,
                  obscureText: !_isPasswordVisible,
                  decoration: InputDecoration(
                    hintText: 'Password',
                    hintStyle: const TextStyle(color: Colors.grey),
                    prefixIcon: const Icon(
                      Icons.lock_outline,
                      color: Colors.grey,
                    ),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _isPasswordVisible
                            ? Icons.visibility
                            : Icons.visibility_off,
                        color: Colors.grey,
                      ),
                      onPressed: () {
                        setState(() {
                          _isPasswordVisible = !_isPasswordVisible;
                        });
                      },
                    ),
                    filled: true,
                    fillColor: const Color(0xFFFAFAFA),
                    contentPadding: const EdgeInsets.symmetric(vertical: 18),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFEAEAEA)),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                      borderSide: const BorderSide(color: Color(0xFFEAEAEA)),
                    ),
                  ),
                ),
                const SizedBox(height: 40),

                // Tombol Masuk
                SizedBox(
                  height: 55,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFF9E5E1),
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                    ),
                    onPressed: _isLoading ? null : _handleLogin,
                    child: _isLoading
                        ? const CircularProgressIndicator(color: Colors.white)
                        : const Text(
                            'Masuk',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.grey,
                            ),
                          ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
