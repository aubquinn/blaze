import { Navigation } from "./navigation/Navigation";
import { Home } from "./home/Home";
import { AppShell } from "@astryxdesign/core/AppShell";
import { useMediaQuery } from "@astryxdesign/core";

function App() {
  const isCompact = useMediaQuery("(width < 1024px)");

  return (
    <AppShell
      sideNav={isCompact ? undefined : <Navigation />}
      topNav={isCompact ? <Navigation layout="top" /> : undefined}
      mobileNav={false}
      height="auto"
      variant="surface"
      contentPadding={0}
    >
      <Home />
    </AppShell>
  );
}

export default App;
