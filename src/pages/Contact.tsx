import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import ScanlineEffect from "@/components/ScanlineEffect";
import GlitchText from "@/components/GlitchText";
import BackToTop from "@/components/BackToTop";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";

const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(100, "Name too long"),
	email: z
		.string()
		.trim()
		.email("Invalid email address")
		.max(255, "Email too long"),
	message: z
		.string()
		.trim()
		.min(1, "Message is required")
		.max(2000, "Message too long (max 2000 chars)"),
});

type ContactForm = z.infer<typeof contactSchema>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const Contact = () => {
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ContactForm>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = async (data: ContactForm) => {
		setSubmitError("");
		try {
			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (res.ok) {
				setSubmitted(true);
			} else {
				setSubmitError("Failed to send. Please try again.");
			}
		} catch {
			setSubmitError("Network error. Please try again.");
		}
	};

	const inputClass =
		"w-full px-4 py-3 glass-subtle rounded-xl text-sm text-foreground placeholder:text-muted-foreground/40 border border-border/20 focus:border-primary/40 focus:outline-none focus:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all font-mono bg-transparent";

	return (
		<div className="relative min-h-screen overflow-x-hidden bg-background">
			<Helmet>
				<title>Contact | Onslaught2342</title>
				<meta
					name="description"
					content="Get in touch with Onslaught2342 — security research, collaboration, and more."
				/>
				<meta property="og:title" content="Contact | Onslaught2342" />
			</Helmet>
			<MatrixBackground />
			<ScanlineEffect />
			<BackToTop />
			<CommandPalette />

			<header className="glass sticky top-0 z-40 border-b border-border/20">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
					<Link
						to="/"
						className="flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>cd ..</span>
					</Link>
					<ThemeToggle />
				</div>
			</header>

			<main className="relative z-10 mx-auto max-w-2xl px-3 py-8 sm:px-6 sm:py-12">
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-4xl">
						<GlitchText text="CONTACT" intensity="low" />
					</h1>
					<p className="font-mono text-sm text-muted-foreground/60">
						$ mail -s "collaboration" onslaught@secure
					</p>
				</motion.div>

				{submitted ? (
					<motion.div
						className="glass-intense space-y-4 rounded-2xl p-8 text-center"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4 }}
					>
						<CheckCircle className="mx-auto h-12 w-12 animate-glow-pulse text-primary" />
						<h2 className="font-display text-lg text-foreground">
							Message Sent
						</h2>
						<p className="font-body text-sm text-muted-foreground">
							Thanks for reaching out. I'll get back to you soon.
						</p>
						<Link
							to="/"
							className="glass-subtle inline-flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs text-primary transition-colors hover:text-accent"
						>
							<ArrowLeft className="h-3 w-3" /> Back to home
						</Link>
					</motion.div>
				) : (
					<motion.form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.15 }}
					>
						<div className="glass-intense space-y-5 rounded-2xl p-6 sm:p-8">
							<motion.div
								initial={{ opacity: 0, x: -16 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.35, delay: 0.25 }}
							>
								<label className="mb-1.5 block font-mono text-xs text-muted-foreground">
									<span className="text-primary">$</span> name
								</label>
								<input
									{...register("name")}
									placeholder="Your name"
									className={inputClass}
								/>
								{errors.name && (
									<p className="mt-1 font-mono text-xs text-destructive">
										{errors.name.message}
									</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -16 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.35, delay: 0.35 }}
							>
								<label className="mb-1.5 block font-mono text-xs text-muted-foreground">
									<span className="text-primary">$</span>{" "}
									email
								</label>
								<input
									{...register("email")}
									type="email"
									placeholder="you@example.com"
									className={inputClass}
								/>
								{errors.email && (
									<p className="mt-1 font-mono text-xs text-destructive">
										{errors.email.message}
									</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -16 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.35, delay: 0.45 }}
							>
								<label className="mb-1.5 block font-mono text-xs text-muted-foreground">
									<span className="text-primary">$</span>{" "}
									message
								</label>
								<textarea
									{...register("message")}
									rows={5}
									placeholder="What's on your mind?"
									className={`${inputClass} resize-none`}
								/>
								{errors.message && (
									<p className="mt-1 font-mono text-xs text-destructive">
										{errors.message.message}
									</p>
								)}
							</motion.div>

							{submitError && (
								<p className="font-mono text-xs text-destructive">
									{submitError}
								</p>
							)}

							<motion.button
								type="submit"
								disabled={isSubmitting}
								className="glass-subtle flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-mono text-sm text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: 0.55 }}
							>
								<Send className="h-4 w-4" />
								{isSubmitting ? "Sending..." : "[SEND_MESSAGE]"}
							</motion.button>
						</div>
					</motion.form>
				)}
			</main>
		</div>
	);
};

export default Contact;
