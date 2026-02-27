import SwiftUI

struct ContentView: View {
    @AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false
    @State private var showSplash = true

    var body: some View {
        ZStack {
            Color(red: 10/255, green: 10/255, blue: 26/255)
                .ignoresSafeArea()
                
            if hasCompletedOnboarding {
                WebView()
                    .ignoresSafeArea(.all, edges: .bottom)
                    .transition(.opacity)
            } else {
                OnboardingView(hasCompletedOnboarding: $hasCompletedOnboarding)
                    .transition(.opacity)
            }

            if showSplash {
                SplashView(showSplash: $showSplash)
                    .transition(.opacity)
                    .zIndex(1)
            }
        }
        .animation(.easeInOut(duration: 0.4), value: showSplash)
        .animation(.easeInOut(duration: 0.3), value: hasCompletedOnboarding)
    }
}

#Preview {
    ContentView()
}
