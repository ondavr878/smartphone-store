import SwiftUI

struct OnboardingPage: Identifiable {
    let id = UUID()
    let icon: String
    let iconColor: Color
    let title: String
    let subtitle: String
    let bgGradient: [Color]
}

struct OnboardingView: View {
    @Binding var hasCompletedOnboarding: Bool
    @State private var currentPage = 0

    private let pages: [OnboardingPage] = [
        OnboardingPage(
            icon: "iphone.gen3",
            iconColor: .blue,
            title: "Welcome to\nPhoneVault",
            subtitle: "Discover the latest smartphones from the world's top brands — all in one place.",
            bgGradient: [Color(hex: "667eea"), Color(hex: "764ba2")]
        ),
        OnboardingPage(
            icon: "heart.fill",
            iconColor: .pink,
            title: "Save Your\nFavorites",
            subtitle: "Tap the heart to save phones you love. Build your wishlist and never lose track.",
            bgGradient: [Color(hex: "f093fb"), Color(hex: "f5576c")]
        ),
        OnboardingPage(
            icon: "cart.fill",
            iconColor: .green,
            title: "Shop with\nConfidence",
            subtitle: "Compare specs, pick your storage & color, and check out in seconds.",
            bgGradient: [Color(hex: "4facfe"), Color(hex: "00f2fe")]
        ),
    ]

    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: pages[currentPage].bgGradient,
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()
            .animation(.easeInOut(duration: 0.5), value: currentPage)

            VStack(spacing: 0) {
                Spacer()

                // Icon
                ZStack {
                    Circle()
                        .fill(.white.opacity(0.15))
                        .frame(width: 160, height: 160)
                    Circle()
                        .fill(.white.opacity(0.1))
                        .frame(width: 120, height: 120)
                    Image(systemName: pages[currentPage].icon)
                        .font(.system(size: 48, weight: .medium))
                        .foregroundStyle(.white)
                        .symbolEffect(.bounce, value: currentPage)
                }
                .padding(.bottom, 40)

                // Text
                VStack(spacing: 12) {
                    Text(pages[currentPage].title)
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                        .foregroundStyle(.white)
                        .multilineTextAlignment(.center)
                        .lineSpacing(4)

                    Text(pages[currentPage].subtitle)
                        .font(.system(size: 16, weight: .regular))
                        .foregroundStyle(.white.opacity(0.75))
                        .multilineTextAlignment(.center)
                        .lineSpacing(4)
                        .padding(.horizontal, 32)
                }
                .animation(.easeInOut(duration: 0.3), value: currentPage)

                Spacer()

                // Page indicators
                HStack(spacing: 8) {
                    ForEach(0..<pages.count, id: \.self) { index in
                        Capsule()
                            .fill(index == currentPage ? .white : .white.opacity(0.35))
                            .frame(
                                width: index == currentPage ? 28 : 8,
                                height: 8
                            )
                            .animation(.spring(response: 0.3), value: currentPage)
                    }
                }
                .padding(.bottom, 32)

                // Button
                Button {
                    if currentPage < pages.count - 1 {
                        withAnimation(.spring(response: 0.4)) {
                            currentPage += 1
                        }
                    } else {
                        withAnimation(.easeInOut(duration: 0.3)) {
                            hasCompletedOnboarding = true
                        }
                    }
                } label: {
                    HStack(spacing: 8) {
                        Text(currentPage < pages.count - 1 ? "Next" : "Get Started")
                            .font(.system(size: 18, weight: .semibold))
                        Image(systemName: currentPage < pages.count - 1 ? "arrow.right" : "checkmark")
                            .font(.system(size: 16, weight: .semibold))
                    }
                    .foregroundStyle(pages[currentPage].bgGradient[0])
                    .frame(maxWidth: .infinity)
                    .frame(height: 56)
                    .background(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                    .shadow(color: .black.opacity(0.1), radius: 10, y: 5)
                }
                .padding(.horizontal, 24)

                // Skip
                if currentPage < pages.count - 1 {
                    Button {
                        withAnimation(.easeInOut(duration: 0.3)) {
                            hasCompletedOnboarding = true
                        }
                    } label: {
                        Text("Skip")
                            .font(.system(size: 15, weight: .medium))
                            .foregroundStyle(.white.opacity(0.6))
                    }
                    .padding(.top, 16)
                }

                Spacer()
                    .frame(height: 32)
            }
        }
        .gesture(
            DragGesture(minimumDistance: 50)
                .onEnded { value in
                    if value.translation.width < -50 && currentPage < pages.count - 1 {
                        withAnimation(.spring(response: 0.4)) {
                            currentPage += 1
                        }
                    } else if value.translation.width > 50 && currentPage > 0 {
                        withAnimation(.spring(response: 0.4)) {
                            currentPage -= 1
                        }
                    }
                }
        )
    }
}

// MARK: - Color Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

#Preview {
    OnboardingView(hasCompletedOnboarding: .constant(false))
}
