# PRD: Information Architecture & Visual Design — CoreClaw API Directory

## Executive Summary

This PRD defines the information architecture, visual design system, and user experience for the CoreClaw API Directory. The design prioritizes developer productivity, enabling fast discovery, comparison, and integration of 118 CoreClaw Workers across 11 categories through intuitive navigation, clear visual hierarchy, and responsive layouts.

## Problem Statement

Developer tools directories often suffer from poor information architecture—overwhelming users with too many options, unclear categorization, and inconsistent visual language. The CoreClaw directory needs a design system that scales from 118 to 1,000+ workers while maintaining discoverability and usability.

## Goals & Success Metrics

| Metric | Current | Target (6mo) | Target (12mo) |
|--------|---------|---------------|----------------|
| Task completion rate | N/A | 85% | 92% |
| Time to first find | N/A | <30 seconds | <15 seconds |
| Search success rate | N/A | 80% | 90% |
| User satisfaction (SUS) | N/A | 75 | 85 |
| Pages per session | N/A | 3 | 4 |

## Information Architecture

### Site Map

```
Home (/)
├── Directory (/directory)
│   ├── Category Browse (/directory/:category)
│   └── Worker Detail (/directory/workers/:slug)
├── Search (/search)
├── Compare (/compare)
├── Recommend (/recommend)
├── Guides (/guides)
│   ├── Category Guide (/guides/:category)
│   └── Use Case Guide (/guides/use-cases/:use-case)
├── Pricing (/pricing)
├── Documentation (/docs)
│   ├── API Reference (/docs/api)
│   ├── SDKs (/docs/sdks)
│   └── Tutorials (/docs/tutorials)
├── Blog (/blog)
├── Community (/community)
│   ├── Discord (/community/discord)
│   └── GitHub (/community/github)
└── Account (/account)
    ├── Dashboard (/account/dashboard)
    ├── Collections (/account/collections)
    ├── API Keys (/account/api-keys)
    └── Settings (/account/settings)
```

### Navigation Structure

**Primary Navigation:**
- Directory (main entry point)
- Search (quick access)
- Compare (comparison tool)
- Pricing (conversion)
- Docs (developer resources)

**Secondary Navigation:**
- Blog
- Community
- Account

**Footer Navigation:**
- About
- Careers
- Contact
- Privacy
- Terms

### Category Taxonomy

```
11 Categories (expandable to 20+):
├── Communication (12 workers)
│   ├── Email APIs
│   ├── SMS APIs
│   ├── Push Notifications
│   └── Chat/Messaging
├── Data (10 workers)
│   ├── Databases
│   ├── Caching
│   ├── Search
│   └── Analytics
├── Automation (15 workers)
│   ├── Workflow Engines
│   ├── Scheduling
│   ├── Event Processing
│   └── Integration
├── Security (8 workers)
│   ├── Authentication
│   ├── Authorization
│   ├── Encryption
│   └── Compliance
├── DevTools (14 workers)
│   ├── Testing
│   ├── Deployment
│   ├── Monitoring
│   └── Documentation
├── AI/ML (12 workers)
│   ├── LLM APIs
│   ├── Image Processing
│   ├── NLP
│   └── Recommendations
├── Payments (6 workers)
│   ├── Payment Processing
│   ├── Subscriptions
│   └── Invoicing
├── Storage (8 workers)
│   ├── File Storage
│   ├── CDN
│   ├── Backup
│   └── Media
├── Productivity (10 workers)
│   ├── Project Management
│   ├── Collaboration
│   └── Time Tracking
├── Marketing (9 workers)
│   ├── SEO
│   ├── Analytics
│   └── Campaigns
└── Utilities (14 workers)
    ├── Text Processing
    ├── Date/Time
    └── Validation
```

## Visual Design System

### Brand Colors

```css
:root {
  /* Primary */
  --color-primary: #6366f1;        /* Indigo 500 */
  --color-primary-hover: #4f46e5;  /* Indigo 600 */
  --color-primary-light: #e0e7ff;  /* Indigo 100 */
  
  /* Secondary */
  --color-secondary: #10b981;      /* Emerald 500 */
  --color-secondary-hover: #059669;/* Emerald 600 */
  
  /* Neutral */
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;   /* Gray 50 */
  --color-bg-tertiary: #f3f4f6;    /* Gray 100 */
  --color-text: #111827;           /* Gray 900 */
  --color-text-secondary: #6b7280; /* Gray 500 */
  --color-border: #e5e7eb;         /* Gray 200 */
  
  /* Status */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Typography

```css
:root {
  /* Headings */
  --font-heading: 'Inter', -apple-system, sans-serif;
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.5rem;
  --font-size-h4: 1.25rem;
  
  /* Body */
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-xs: 0.75rem;
  
  /* Code */
  --font-code: 'JetBrains Mono', 'Fira Code', monospace;
  --font-size-code: 0.875rem;
}
```

### Spacing & Layout

```css
:root {
  /* Spacing scale (4px base) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  
  /* Layout */
  --max-width: 1280px;
  --sidebar-width: 280px;
  --header-height: 64px;
  
  /* Grid */
  --grid-columns: 12;
  --grid-gap: 1.5rem;
}
```

### Component Library

#### Cards
```css
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: var(--space-6);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.card-title {
  font-size: var(--font-size-h4);
  font-weight: 600;
}

.card-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
```

#### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn-secondary:hover {
  background: var(--color-bg-secondary);
}
```

#### Search Input
```css
.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  padding-left: var(--space-10);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: var(--font-size-base);
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.search-icon {
  position: absolute;
  left: var(--space-3);
  color: var(--color-text-secondary);
}
```

## Key Page Designs

### 1. Homepage

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Header: Logo | Nav | Search | CTA          │
├─────────────────────────────────────────────┤
│ Hero: Tagline + Search Bar + Stats         │
├─────────────────────────────────────────────┤
│ Featured Workers (Carousel)                │
├─────────────────────────────────────────────┤
│ Category Grid (4x3)                        │
├─────────────────────────────────────────────┤
│ Comparison Showcase                        │
├─────────────────────────────────────────────┤
│ Testimonials                               │
├─────────────────────────────────────────────┤
│ Pricing Preview                            │
├─────────────────────────────────────────────┤
│ Footer                                     │
└─────────────────────────────────────────────┘
```

### 2. Directory Listing

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Home > Directory > Category    │
├─────────────────────────────────────────────┤
│ Filters Sidebar | Worker Grid              │
│ ├── Category     │ ┌─────┐ ┌─────┐ ┌─────┐│
│ ├── Complexity   │ │Worker│ │Worker│ │Worker││
│ ├── Price        │ │Card 1│ │Card 2│ │Card 3││
│ └── Platform     │ └─────┘ └─────┘ └─────┘│
│                  │ ┌─────┐ ┌─────┐ ┌─────┐│
│                  │ │Worker│ │Worker│ │Worker││
│                  │ │Card 4│ │Card 5│ │Card 6││
│                  │ └─────┘ └─────┘ └─────┘│
├─────────────────────────────────────────────┤
│ Pagination                                 │
└─────────────────────────────────────────────┘
```

### 3. Worker Detail

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Home > Directory > Worker Name  │
├─────────────────────────────────────────────┤
│ Header: Icon | Name | Category | Health    │
├─────────────────────────────────────────────┤
│ Quick Stats | Action Buttons               │
├─────────────────────────────────────────────┤
│ Tabs: Overview | Parameters | Examples |   │
│       Schema | Similar | Reviews           │
├─────────────────────────────────────────────┤
│ Tab Content                                │
├─────────────────────────────────────────────┤
│ Related Workers                            │
├─────────────────────────────────────────────┤
│ Footer                                     │
└─────────────────────────────────────────────┘
```

### 4. Comparison Page

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Header: Compare Workers                    │
├─────────────────────────────────────────────┤
│ Worker Selection (3-5 workers)             │
├─────────────────────────────────────────────┤
│ Comparison Table                           │
│ ├── Features    │ ✓ │ ✓ │ ✗ │             │
│ ├── Pricing     │ $0 │$29│ $99│            │
│ ├── Complexity  │ Low│Med│High│            │
│ └── Performance │ ★★★│★★★│★★★ │           │
├─────────────────────────────────────────────┤
│ Detailed Comparison                        │
├─────────────────────────────────────────────┤
│ Recommendation                             │
└─────────────────────────────────────────────┘
```

## Responsive Design

### Breakpoints
```css
/* Mobile: < 640px */
/* Tablet: 640px - 1024px */
/* Desktop: > 1024px */
/* Wide: > 1280px */
```

### Mobile Adaptations
- Hamburger menu for navigation
- Single column layout
- Collapsible filters
- Bottom navigation bar
- Swipe gestures for carousels

### Tablet Adaptations
- 2-column grid
- Sidebar filters visible
- Simplified navigation

### Desktop Adaptations
- Full navigation visible
- 3-4 column grid
- Sidebar filters
- Hover states

## Accessibility (WCAG 2.1 AA)

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- No information conveyed by color alone

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Skip navigation links

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Alt text for images
- Live regions for dynamic content

### Motion
- Respect `prefers-reduced-motion`
- No auto-playing animations
- Smooth transitions (optional)

## Implementation Phases

### Phase 1: Design System (Weeks 1-2)
- [ ] Create Figma component library
- [ ] Set up CSS custom properties
- [ ] Build base components (buttons, cards, inputs)
- [ ] Document design tokens

### Phase 2: Core Pages (Weeks 3-4)
- [ ] Design homepage
- [ ] Design directory listing
- [ ] Design worker detail
- [ ] Design comparison page

### Phase 3: Responsive (Weeks 5-6)
- [ ] Mobile layouts
- [ ] Tablet layouts
- [ ] Touch interactions
- [ ] Performance optimization

### Phase 4: Accessibility (Week 7)
- [ ] WCAG audit
- [ ] Keyboard testing
- [ ] Screen reader testing
- [ ] Color contrast verification

## Technical Requirements

- Next.js 14 with App Router
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for forms
- Zod for validation

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Design inconsistency | Medium | Component library, design tokens |
| Performance issues | Medium | Lazy loading, code splitting |
| Accessibility gaps | High | Regular audits, testing |
| Mobile usability | Medium | Progressive enhancement |

## Owner

Cartography Designer — responsible for information architecture, visual design, and user experience.
