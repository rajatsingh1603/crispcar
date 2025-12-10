# DriveClean Landing Page - Design Guidelines

## Design Approach
**System Selected:** Modern SaaS/Startup design pattern inspired by products like Stripe, Linear, and modern app landing pages.

**Core Principles:**
- Clean, minimal interface with generous whitespace
- Trust-building through professional polish and social proof
- Mobile-first responsive design
- Clear conversion paths to app downloads

---

## Color Palette
User specified: White/blue/black theme
- Primary Blue: Modern, trust-building blue for CTAs and accents
- Black: Deep black for typography hierarchy
- White: Clean backgrounds
- Gray scale: For secondary text and subtle UI elements

---

## Typography System
**Hierarchy:**
- Hero headline: Bold, extra-large (text-5xl to text-6xl), tight leading
- Section headlines: Bold, large (text-3xl to text-4xl)
- Subheadings: Medium weight (text-xl to text-2xl)
- Body text: Regular weight (text-base to text-lg), comfortable line-height
- Small text: For disclaimers, footer (text-sm)

**Font Selection:** Use Google Fonts - Inter or similar modern sans-serif

---

## Layout System
**Spacing Units:** Tailwind units of 4, 8, 12, 16, 20, 24, 32 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 to py-16 (mobile)
- Component gaps: gap-6 to gap-8 for card grids
- Container max-width: max-w-7xl with horizontal padding

**Grid Strategy:**
- Features: 3-column grid on desktop (lg:grid-cols-3), 1-column mobile
- Pricing: 2-3 column layout for plans
- Testimonials: 2-3 column grid
- FAQ: Single column, max-w-3xl for readability

---

## Component Library

### Hero Section
- Full viewport height with centered content
- Large hero image showing clean car or DriveClean app mockup in use
- Tagline prominently displayed with strong typography
- Dual CTA buttons: "Download for iOS" and "Download for Android" with app store badges
- Buttons on image backgrounds: Use backdrop-blur with semi-transparent background
- Subtle scroll indicator at bottom

### How It Works Section
- 3-step process visualization
- Large numbered steps or timeline layout
- Icon + title + description for each step
- Icons from HeroIcons representing: registration, subscription, service delivery

### Features Section
- 5 feature cards in grid layout (2 rows on desktop)
- Each card: HeroIcon + bold title + 2-3 line description
- Rounded corners (rounded-xl), subtle shadow (shadow-lg)
- Features: Daily Cleaning, Reliable Workers, Tracking Calendar, Photo Proof, Easy Subscription

### Mobile Phone Mockup
- Integrate tastefully in Hero or How It Works section
- Show DriveClean app interface with calendar/tracking view
- Use perspective transform for dimensional effect
- Position: Floating alongside or within hero content

### Pricing Section
- 2-3 pricing tiers in card format
- Clear plan names, prominent pricing
- Feature bullet lists with checkmarks
- Highlighted "Popular" or "Best Value" badge on middle tier
- CTA button on each card

### Testimonials
- 3 testimonial cards with customer quotes
- Include: Avatar placeholder, name, role/location, 5-star rating
- Short, authentic-sounding reviews about convenience and service quality

### FAQ Section
- Accordion-style expandable questions
- 5-7 common questions about service, pricing, coverage
- Smooth expand/collapse animations
- Questions aligned in single column for easy scanning

### Footer
- Multi-column layout (4 columns desktop, stack on mobile)
- Columns: About/Links, Features, Download, Contact
- Social media icons (HeroIcons: Twitter, Facebook, Instagram, LinkedIn)
- Copyright and legal links
- Repeated app download buttons

---

## Animations & Interactions
- Scroll-triggered fade-ins for sections (use Intersection Observer)
- Smooth hover states on cards (subtle lift + shadow increase)
- Button hover: Slight scale or color intensity change
- FAQ accordion: Smooth height transition
- Keep animations subtle and professional - no excessive motion

---

## Images Strategy
**Hero Image:** Yes - Large background image showing either:
- Clean, shiny car in professional setting, OR
- Happy customer with clean car, OR
- Abstract clean/modern automotive visual

**Additional Images:**
- Mobile phone mockup with app interface
- Optional: Before/after car cleaning comparison
- Testimonial avatars (use placeholder services initially)

**Image Treatment:**
- Use overlay gradients on hero for text readability
- Maintain aspect ratios, use object-cover
- Optimize for performance

---

## Responsive Breakpoints
- Mobile: base (< 640px) - Single column, stacked layout
- Tablet: md (640px+) - 2-column grids where appropriate
- Desktop: lg (1024px+) - Full multi-column layouts, max width containers

---

## Visual Style Elements
- Rounded corners: rounded-lg to rounded-2xl for cards and buttons
- Shadows: shadow-sm to shadow-xl for depth hierarchy
- Borders: Minimal use, prefer shadows for separation
- Icons: HeroIcons throughout, consistent sizing (w-6 h-6 to w-12 h-12)
- Button style: Solid primary blue, high contrast, rounded-full or rounded-lg
- Glass morphism for buttons over images: backdrop-blur-sm with bg-white/20

---

## Trust & Conversion Elements
- Social proof: "Trusted by X users" stat in hero
- App store badges: Use official badge graphics
- Security/reliability indicators
- Clear value propositions
- Multiple strategically placed download CTAs