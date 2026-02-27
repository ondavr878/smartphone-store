import SwiftUI

struct ContentView: View {
    @AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false

    var body: some View {
        if hasCompletedOnboarding {
            WebView()
                .ignoresSafeArea(.all, edges: .bottom)
                .transition(.opacity)
        } else {
            OnboardingView(hasCompletedOnboarding: $hasCompletedOnboarding)
                .transition(.opacity)
        }
    }
}

#Preview {
    ContentView()
}
