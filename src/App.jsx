import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import BottomNav from "./components/BottomNav";
import FloatingActions from "./components/FloatingActions";
import ExitIntentPopup from "./components/ExitIntentPopup";
import GlobalConsultSticky from "./components/GlobalConsultSticky";
import { LanguageProvider } from "./context/LanguageContext";

// Lazy loading pages for performance
const Home = lazy(() => import("./pages/Home"));
const Dtm = lazy(() => import("./pages/Dtm"));
const SchoolDtm = lazy(() => import("./pages/SchoolDtm"));
const Team = lazy(() => import("./pages/Team"));
const Blog = lazy(() => import("./pages/Blog"));
const SchoolLife = lazy(() => import("./pages/SchoolLife"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <Header />

        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dtm" element={<Dtm />} />
              <Route path="/schooldtm" element={<SchoolDtm />} />
              <Route path="/team" element={<Team />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/life" element={<SchoolLife />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </Suspense>
        </main>

        <FloatingActions />
        <GlobalConsultSticky />
        <ExitIntentPopup />
        <div className="pb-20 lg:pb-0">
          <Footer />
        </div>
        <BottomNav />
      </Router>
    </LanguageProvider>
  );
}

export default App;
