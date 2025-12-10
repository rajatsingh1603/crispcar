import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTheme } from "@/components/theme-provider";
import { 
  Sparkles, 
  Users, 
  CalendarDays, 
  Camera, 
  CreditCard, 
  ChevronDown,
  Star,
  Check,
  UserPlus,
  ClipboardCheck,
  Car,
  Moon,
  Sun
} from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let observer: IntersectionObserver | null = null;
    let isObserving = false;

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setIsInView(true);
            if (observer && element && isObserving) {
              observer.unobserve(element);
              isObserving = false;
            }
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      isObserving = true;
    } catch {
      setIsInView(true);
    }

    return () => {
      if (observer) {
        if (element && isObserving) {
          try {
            observer.unobserve(element);
          } catch {
            // Ignore unobserve errors
          }
        }
        try {
          observer.disconnect();
        } catch {
          // Ignore disconnect errors
        }
      }
    };
  }, []);

  return { ref, isInView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      size="icon" 
      variant="ghost" 
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <a href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">DriveClean</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6" data-testid="nav-main">
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-how-it-works">How It Works</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-features">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-pricing">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button data-testid="button-download-header">
              Download App
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background" data-testid="section-hero">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-muted rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-muted rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <AnimatedSection>
              <Badge variant="secondary" className="mb-6" data-testid="badge-trust">
                Trusted by 10,000+ car owners
              </Badge>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight" data-testid="text-hero-title">
                Daily Car Cleaning.{" "}
                <span className="text-primary">Monthly Subscription.</span>{" "}
                Zero Effort.
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0" data-testid="text-hero-description">
                Register your car, choose a plan, and let our professional cleaners keep your vehicle spotless every single day. Track progress with photos and a cleaning calendar.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="gap-2" data-testid="button-hero-download-ios">
                  <SiApple className="w-5 h-5" />
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-download-android">
                  <SiGoogleplay className="w-5 h-5" />
                  Download for Android
                </Button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start" data-testid="social-proof">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary border-2 border-background flex items-center justify-center"
                      data-testid={`avatar-user-${i}`}
                    >
                      <span className="text-xs font-medium text-primary-foreground">{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1" data-testid="rating-stars">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid="text-rating">4.9 rating from 2,000+ reviews</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={200} className="relative">
            <div className="relative mx-auto w-64 sm:w-72 lg:w-80" data-testid="phone-mockup">
              <div className="absolute inset-0 bg-muted rounded-[3rem] blur-2xl transform rotate-6" />
              <div className="relative bg-card rounded-[2.5rem] p-3 shadow-2xl border border-border">
                <div className="bg-background rounded-[2rem] overflow-hidden">
                  <div className="bg-muted px-6 py-4 flex items-center justify-between gap-2 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Car className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-sm text-foreground">DriveClean</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Pro Plan</Badge>
                  </div>
                  
                  <div className="p-4 space-y-4 bg-background">
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Today's Status</p>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="font-medium text-sm text-foreground">Cleaned at 8:32 AM</span>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-2">This Week</p>
                      <div className="flex gap-1">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                          <div key={i} className="flex-1 text-center">
                            <p className="text-[10px] text-muted-foreground mb-1">{day}</p>
                            <div className={`w-full aspect-square rounded-md flex items-center justify-center ${
                              i < 5 ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}>
                              {i < 5 && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <p className="text-xs text-muted-foreground mb-2">Photo Proof</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block" data-testid="scroll-indicator">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Register Your Car",
      description: "Download the app and add your vehicle details including make, model, and parking location."
    },
    {
      icon: CreditCard,
      step: "02",
      title: "Choose Your Plan",
      description: "Select a monthly subscription that fits your needs. Cancel or change anytime."
    },
    {
      icon: ClipboardCheck,
      step: "03",
      title: "Daily Cleaning Service",
      description: "Our assigned workers visit daily to clean your car exterior. Track everything in the app."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted" data-testid="section-how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-how-it-works">How It Works</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-how-it-works-title">
            Three Simple Steps to a<br />
            <span className="text-primary">Spotless Car</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-description">
            Getting started with DriveClean is easy. Follow these simple steps and enjoy a clean car every day.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <AnimatedSection key={item.step} delay={index * 150}>
              <div className="relative text-center group" data-testid={`step-${index + 1}`}>
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-card flex items-center justify-center group-hover:bg-accent transition-colors border border-border">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`text-step-title-${index + 1}`}>{item.title}</h3>
                <p className="text-muted-foreground" data-testid={`text-step-description-${index + 1}`}>{item.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Daily Exterior Cleaning",
      description: "Your car gets professionally cleaned every single day. No more dusty vehicles or bird droppings."
    },
    {
      icon: Users,
      title: "Reliable Workers",
      description: "Vetted and trained cleaning professionals assigned to your car. Consistent quality every time."
    },
    {
      icon: CalendarDays,
      title: "Tracking Calendar",
      description: "View your cleaning history, upcoming schedules, and never miss a day with our smart calendar."
    },
    {
      icon: Camera,
      title: "Photo Proof",
      description: "Receive before and after photos of each cleaning session. Full transparency guaranteed."
    },
    {
      icon: CreditCard,
      title: "Easy Subscription",
      description: "Flexible monthly plans with no long-term commitment. Pause, upgrade, or cancel anytime."
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-background" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-features">Features</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-features-title">
            Everything You Need for a<br />
            <span className="text-primary">Perfectly Clean Car</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-features-description">
            DriveClean combines convenience with quality to deliver the best car cleaning experience.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 100}>
              <Card className="h-full hover-elevate transition-all duration-300 group" data-testid={`card-feature-${index + 1}`}>
                <CardContent className="p-6 lg:p-8">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-accent transition-colors border border-border">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`text-feature-title-${index + 1}`}>{feature.title}</h3>
                  <p className="text-muted-foreground" data-testid={`text-feature-description-${index + 1}`}>{feature.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "29",
      period: "month",
      description: "Perfect for single car owners",
      features: [
        "Daily exterior cleaning",
        "One vehicle included",
        "Basic photo updates",
        "Standard scheduling",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "49",
      period: "month",
      description: "Best value for regular users",
      features: [
        "Daily exterior cleaning",
        "Up to 2 vehicles",
        "HD photo proof gallery",
        "Priority scheduling",
        "In-app chat support",
        "Weekly detail reports"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "79",
      period: "month",
      description: "For car enthusiasts",
      features: [
        "Daily exterior cleaning",
        "Up to 4 vehicles",
        "Interior cleaning (weekly)",
        "24/7 priority support",
        "Dedicated cleaner",
        "Monthly deep clean included"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted" data-testid="section-pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-pricing">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-pricing-title">
            Simple, Transparent<br />
            <span className="text-primary">Pricing Plans</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-pricing-description">
            Choose the plan that works for you. No hidden fees, cancel anytime.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection key={plan.name} delay={index * 150}>
              <Card 
                className={`relative h-full ${plan.popular ? "border-primary border-2 shadow-lg scale-105" : ""}`}
                data-testid={`card-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground" data-testid="badge-popular">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl text-foreground" data-testid={`text-plan-name-${plan.name.toLowerCase()}`}>{plan.name}</CardTitle>
                  <CardDescription data-testid={`text-plan-description-${plan.name.toLowerCase()}`}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <div className="mt-4 mb-6" data-testid={`text-plan-price-${plan.name.toLowerCase()}`}>
                    <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-start gap-3" data-testid={`text-plan-feature-${plan.name.toLowerCase()}-${featureIndex + 1}`}>
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    data-testid={`button-select-${plan.name.toLowerCase()}`}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      rating: 5,
      quote: "DriveClean has been a game-changer for me. My car is always spotless without me lifting a finger. The photo proof feature gives me peace of mind."
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      rating: 5,
      quote: "I was skeptical at first, but the quality is incredible. My assigned cleaner is always on time and does an amazing job. Highly recommend!"
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Agent",
      rating: 5,
      quote: "As someone who meets clients daily, a clean car is essential. DriveClean saves me hours every week and my car looks showroom-ready every day."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-background" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-testimonials">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-testimonials-title">
            Loved by <span className="text-primary">Thousands</span><br />
            of Car Owners
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-testimonials-description">
            See what our customers have to say about their DriveClean experience.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 150}>
              <Card className="h-full" data-testid={`card-testimonial-${index + 1}`}>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-4" data-testid={`rating-testimonial-${index + 1}`}>
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic" data-testid={`text-testimonial-quote-${index + 1}`}>"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center" data-testid={`avatar-testimonial-${index + 1}`}>
                      <span className="text-sm font-bold text-primary-foreground">
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground" data-testid={`text-testimonial-name-${index + 1}`}>{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index + 1}`}>{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "How does daily cleaning work?",
      answer: "Once you subscribe, an assigned cleaner visits your parking location every day at a scheduled time. They clean your car's exterior (including windows, body, and wheels) and upload photo proof to the app."
    },
    {
      question: "What if my car is parked in a different location?",
      answer: "You can easily update your parking location through the app. Just make sure to do it before your scheduled cleaning time so our worker can find your vehicle."
    },
    {
      question: "Can I pause or cancel my subscription?",
      answer: "Yes! You can pause your subscription for up to 30 days or cancel anytime from the app settings. No questions asked, no hidden cancellation fees."
    },
    {
      question: "What products do you use for cleaning?",
      answer: "We use premium, eco-friendly car cleaning products that are safe for all paint types and finishes. Our products are pH-balanced and won't damage your car's surface."
    },
    {
      question: "What happens on rainy days?",
      answer: "If it's raining heavily, the cleaning may be skipped for that day and you'll receive a notification. You won't be charged for skipped days, and we'll resume service when weather permits."
    },
    {
      question: "How do I track my cleaning history?",
      answer: "The app has a built-in calendar that shows all past and upcoming cleanings. Each entry includes timestamp, photo proof, and cleaner details for full transparency."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="secondary" className="mb-4" data-testid="badge-faq">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground" data-testid="text-faq-title">
            Frequently Asked<br />
            <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground" data-testid="text-faq-description">
            Got questions? We've got answers.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border px-6"
                data-testid={`faq-item-${index + 1}`}
              >
                <AccordionTrigger 
                  className="text-left text-foreground hover:no-underline py-5"
                  data-testid={`button-faq-${index + 1}`}
                >
                  <span data-testid={`text-faq-question-${index + 1}`}>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5" data-testid={`text-faq-answer-${index + 1}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-background" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16 text-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4" data-testid="text-cta-title">
                Ready for a Spotless Car?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
                Join thousands of happy car owners. Download DriveClean today and experience the convenience of daily car cleaning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-ios">
                  <SiApple className="w-5 h-5" />
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground" data-testid="button-cta-android">
                  <SiGoogleplay className="w-5 h-5" />
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground py-16" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-background">DriveClean</span>
            </a>
            <p className="text-background/70 mb-6" data-testid="text-footer-tagline">
              Daily car cleaning service on a monthly subscription. Making car care effortless.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" data-testid="link-social-twitter" aria-label="Follow us on Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" data-testid="link-social-facebook" aria-label="Follow us on Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" data-testid="link-social-instagram" aria-label="Follow us on Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" data-testid="link-social-linkedin" aria-label="Follow us on LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-background" data-testid="text-footer-quick-links-title">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-how-it-works">How It Works</a></li>
              <li><a href="#features" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-features">Features</a></li>
              <li><a href="#pricing" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-pricing">Pricing</a></li>
              <li><a href="#faq" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-faq">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-background" data-testid="text-footer-legal-title">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#privacy" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-privacy">Privacy Policy</a></li>
              <li><a href="#terms" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-terms">Terms of Service</a></li>
              <li><a href="#refund" className="text-background/70 hover:text-background transition-colors" data-testid="link-footer-refund">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-background" data-testid="text-footer-contact-title">Contact</h3>
            <ul className="space-y-3">
              <li className="text-background/70" data-testid="text-contact-email">support@driveclean.app</li>
              <li className="text-background/70" data-testid="text-contact-phone">1-800-DRIVECLEAN</li>
              <li className="text-background/70" data-testid="text-contact-location">San Francisco, CA</li>
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors" data-testid="link-footer-appstore">
                <SiApple className="w-4 h-4" />
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors" data-testid="link-footer-playstore">
                <SiGoogleplay className="w-4 h-4" />
                Google Play
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-background/50 text-sm" data-testid="text-copyright">
          <p>&copy; {new Date().getFullYear()} DriveClean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
