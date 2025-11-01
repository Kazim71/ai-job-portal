# Icon Usage Documentation

This document tracks all react-icons usage in the AI Job Portal codebase to ensure consistency and prevent runtime errors.

## Current Icon Inventory

### Feather Icons (`react-icons/fi`)
Used for: UI controls, navigation, and general interface elements

| Icon | Usage | Files |
|------|-------|-------|
| `FiSearch` | Search functionality | Hero.jsx, AISearch.jsx |
| `FiMapPin` | Location indicators | Hero.jsx, JobCard.jsx |
| `FiLoader` | Loading states | AISearch.jsx |
| `FiMessageCircle` | Chat/messaging | AISearch.jsx |
| `FiSend` | Send/submit actions | AISearch.jsx |
| `FiAlertCircle` | Error states | AISearch.jsx |
| `FiRefreshCw` | Retry actions | AISearch.jsx |
| `FiClock` | Time/date indicators | JobCard.jsx |
| `FiBuilding` | Company/organization | JobCard.jsx |
| `FiSun` | Light mode toggle | Navbar.jsx |
| `FiMoon` | Dark mode toggle | Navbar.jsx |
| `FiMenu` | Mobile menu open | Navbar.jsx |
| `FiX` | Close/cancel actions | Navbar.jsx |
| `FiLogOut` | Logout functionality | Navbar.jsx |
| `FiUser` | User profile | Navbar.jsx |
| `FiSettings` | Settings/preferences | Navbar.jsx |

### Font Awesome (`react-icons/fa`)
Used for: Brand icons and social media

| Icon | Usage | Files |
|------|-------|-------|
| `FaGithub` | GitHub repository link | Footer.jsx, Navbar.jsx |

### Tabler Icons (`react-icons/tb`)
Used for: Specialized icons not available in Feather

| Icon | Usage | Files |
|------|-------|-------|
| `TbRobot` | AI Assistant toggle | Hero.jsx |

## Icon Guidelines

### Selection Criteria
1. **Consistency**: Prefer Feather Icons (Fi*) for UI elements
2. **Semantic Meaning**: Choose icons that clearly represent their function
3. **Visual Harmony**: Ensure icons work well in both light and dark themes
4. **Accessibility**: All icons should have proper aria-labels when used as buttons

### Adding New Icons
1. Check if a suitable Feather Icon exists first
2. Verify the icon exists in the target package
3. Update this documentation
4. Run `npm run validate-icons` to verify

### Validation
- **Automatic**: Icons are validated on every build (`prebuild` script)
- **Manual**: Run `npm run validate-icons` anytime
- **CI/CD**: Validation runs in build pipeline to prevent invalid imports

## Migration History

### v1.0.0 (2024-11-01)
- **Fixed**: Replaced invalid `FiBot` with `TbRobot` in Hero.jsx
- **Reason**: `FiBot` doesn't exist in Feather Icons
- **Impact**: Resolved runtime import error causing blank page

Last updated: 2024-11-01