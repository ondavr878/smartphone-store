import SwiftUI

struct SplashView: View {
    @State private var logoScale: CGFloat = 0.5
    @State private var logoOpacity: Double = 0
    @State private var ringScale: CGFloat = 0.3
    @State private var ringOpacity: Double = 0
    @State private var ring2Scale: CGFloat = 0.5
    @State private var ring2Opacity: Double = 0
    @State private var textOpacity: Double = 0
    @State private var textOffset: CGFloat = 20
    @State private var subtitleOpacity: Double = 0
    @State private var shimmerOffset: CGFloat = -200
    @State private var isFinished = false

    @Binding var showSplash: Bool

    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: [
                    Color(hex: "0f0c29"),
                    Color(hex: "302b63"),
                    Color(hex: "24243e"),
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            // Animated particles
            GeometryReader { geo in
                ForEach(0..<12, id: \.self) { i in
                    Circle()
                        .fill(.white.opacity(Double.random(in: 0.03...0.08)))
                        .frame(width: CGFloat.random(in: 4...12))
                        .position(
                            x: CGFloat.random(in: 0...geo.size.width),
                            y: CGFloat.random(in: 0...geo.size.height)
                        )
                        .blur(radius: 1)
                        .opacity(logoOpacity)
                }
            }

            VStack(spacing: 0) {
                Spacer()

                // Logo area
                ZStack {
                    // Outer ring pulse
                    Circle()
                        .stroke(
                            LinearGradient(
                                colors: [.blue.opacity(0.3), .purple.opacity(0.1)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 2
                        )
                        .frame(width: 160, height: 160)
                        .scaleEffect(ringScale)
                        .opacity(ringOpacity)

                    // Inner ring
                    Circle()
                        .stroke(
                            LinearGradient(
                                colors: [.blue.opacity(0.5), .cyan.opacity(0.2)],
                                startPoint: .top,
                                endPoint: .bottom
                            ),
                            lineWidth: 1.5
                        )
                        .frame(width: 120, height: 120)
                        .scaleEffect(ring2Scale)
                        .opacity(ring2Opacity)

                    // Glass circle
                    Circle()
                        .fill(
                            .ultraThinMaterial
                        )
                        .frame(width: 100, height: 100)
                        .overlay(
                            Circle()
                                .stroke(.white.opacity(0.2), lineWidth: 1)
                        )
                        .scaleEffect(logoScale)
                        .opacity(logoOpacity)

                    // Icon
                    Image(systemName: "iphone.gen3")
                        .font(.system(size: 40, weight: .light))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.white, .cyan.opacity(0.8)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .scaleEffect(logoScale)
                        .opacity(logoOpacity)
                }

                // App name
                VStack(spacing: 8) {
                    Text("PhoneVault")
                        .font(.system(size: 36, weight: .bold, design: .rounded))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.white, .white.opacity(0.8)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .overlay(
                            Rectangle()
                                .fill(
                                    LinearGradient(
                                        colors: [.clear, .white.opacity(0.4), .clear],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                                .frame(width: 80)
                                .offset(x: shimmerOffset)
                                .mask(
                                    Text("PhoneVault")
                                        .font(.system(size: 36, weight: .bold, design: .rounded))
                                )
                        )
                        .opacity(textOpacity)
                        .offset(y: textOffset)

                    Text("Premium Smartphone Store")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundStyle(.white.opacity(0.4))
                        .opacity(subtitleOpacity)
                        .offset(y: textOffset)
                }
                .padding(.top, 28)

                Spacer()

                // Loading dots
                HStack(spacing: 6) {
                    ForEach(0..<3, id: \.self) { i in
                        Circle()
                            .fill(.white.opacity(0.5))
                            .frame(width: 6, height: 6)
                            .scaleEffect(logoOpacity > 0 ? 1 : 0)
                            .animation(
                                .easeInOut(duration: 0.5)
                                    .repeatForever(autoreverses: true)
                                    .delay(Double(i) * 0.15),
                                value: logoOpacity
                            )
                    }
                }
                .opacity(subtitleOpacity)
                .padding(.bottom, 60)
            }
        }
        .onAppear {
            startAnimations()
        }
    }

    private func startAnimations() {
        // 1. Logo scales in with spring
        withAnimation(.spring(response: 0.6, dampingFraction: 0.6).delay(0.2)) {
            logoScale = 1.0
            logoOpacity = 1.0
        }

        // 2. Outer ring expands
        withAnimation(.easeOut(duration: 0.8).delay(0.3)) {
            ringScale = 1.0
            ringOpacity = 1.0
        }

        // 3. Inner ring follows
        withAnimation(.easeOut(duration: 0.6).delay(0.5)) {
            ring2Scale = 1.0
            ring2Opacity = 1.0
        }

        // 4. Ring pulse animation
        withAnimation(.easeInOut(duration: 1.5).repeatForever(autoreverses: true).delay(1.0)) {
            ringScale = 1.15
            ringOpacity = 0.3
        }

        // 5. Text slides up
        withAnimation(.spring(response: 0.5, dampingFraction: 0.7).delay(0.7)) {
            textOpacity = 1.0
            textOffset = 0
        }

        // 6. Subtitle fades in
        withAnimation(.easeOut(duration: 0.4).delay(1.0)) {
            subtitleOpacity = 1.0
        }

        // 7. Shimmer sweep
        withAnimation(.easeInOut(duration: 1.0).delay(1.2)) {
            shimmerOffset = 200
        }

        // 8. Dismiss after delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
            withAnimation(.easeInOut(duration: 0.4)) {
                showSplash = false
            }
        }
    }
}

#Preview {
    SplashView(showSplash: .constant(true))
}
