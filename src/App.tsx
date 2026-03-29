import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";

const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Index />} />
				<Route
					path="/projects"
					element={
						<Suspense
							fallback={
								<div className="min-h-screen bg-background" />
							}
						>
							<PageTransition>
								<Projects />
							</PageTransition>
						</Suspense>
					}
				/>
				<Route
					path="/contact"
					element={
						<Suspense
							fallback={
								<div className="min-h-screen bg-background" />
							}
						>
							<PageTransition>
								<Contact />
							</PageTransition>
						</Suspense>
					}
				/>
				<Route
					path="/resume"
					element={
						<Suspense
							fallback={
								<div className="min-h-screen bg-background" />
							}
						>
							<PageTransition>
								<Resume />
							</PageTransition>
						</Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<Suspense
							fallback={
								<div className="min-h-screen bg-background" />
							}
						>
							<PageTransition>
								<NotFound />
							</PageTransition>
						</Suspense>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

const App = () => (
	<HelmetProvider>
		<ThemeProvider
			attribute="data-theme"
			defaultTheme="matrix"
			themes={["matrix", "ice", "danger", "midnight"]}
			enableSystem={false}
			disableTransitionOnChange={false}
		>
			<QueryClientProvider client={queryClient}>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<AnimatedRoutes />
					</BrowserRouter>
				</TooltipProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</HelmetProvider>
);

export default App;
