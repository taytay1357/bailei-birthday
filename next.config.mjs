/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "192.168.0.145",      // your phone or other device
    "*.192.168.0.145",    // optional wildcard
  ]
};

export default nextConfig;
