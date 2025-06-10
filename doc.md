Navbar Component Documentation
Overview
The Navbar component is a React functional component designed for a "MovieStream" web application. It provides a sticky navigation bar with a logo, navigation links ("Movies" and "TV"), and a search bar. It leverages react-router-dom for routing, Tailwind CSS for styling, and React hooks for state and side-effect management. The component is responsive, adapting its layout for smaller screens.
Dependencies

React Router DOM: Link, useLocation, useNavigate, useSearchParams for navigation and URL management.
React: useEffect, useRef, useState for state, references, and side effects.
Utilities: mergeClassName (custom utility) for combining CSS classes.
Icons: IoIosSearch from react-icons/io for the search icon.
Components: Container (custom) for layout wrapping.

Styling Constants

MENU_CLASS:
Base styles for navigation links.
Properties: py-1 (vertical padding), px-1.5 (horizontal padding), hover:bg-[#423F71] (hover background color), rounded-md (rounded corners), max:px-6 (custom padding adjustment).

MENU_CLASS_ACTIVE:
Active state style for navigation links.
Properties: bg-[#423F71] (background color for active link).

Component Structure
State and Hooks

location = useLocation()
Retrieves the current URL location (e.g., pathname).

pathname, setPathname = useState("")
Stores and updates the current URL pathname.

params, \_ = useSearchParams()
Accesses URL query parameters; setter is unused.

navigate = useNavigate()
Enables programmatic navigation.

pathnameRef = useRef("")
Persists the current pathname across renders.

defaultKeyword = useRef("")
Stores the default search keyword persistently.

keyword, setKeyword = useState("")
Manages the search input value.

isSearchFocus, setSearchFocus = useState(false)
Tracks whether the search input is focused.

searchRef = useRef(null)
References the search input DOM element.

Functions

goToSearchPage()
Navigates to /search?q={keyword} if keyword is non-empty.
Stores keyword in defaultKeyword ref.
Disables search focus and blurs the input.

initKeyword()
Sets keyword to defaultKeyword.current if on /search path, else clears it.

onWindowClick()
Resets isSearchFocus to false and calls initKeyword on window click.

getMenuClass(path: String)
Returns combined CSS classes for menu items.
If path matches pathname, merges MENU_CLASS and MENU_CLASS_ACTIVE.
Otherwise, applies only MENU_CLASS.

Effects

useEffect for Pathname
Updates pathname state when location.pathname changes.
Dependency: location?.pathname.

useEffect for Window Click
Adds a window click listener to call onWindowClick.
Cleans up by removing the listener on unmount.
Dependency: [] (runs once on mount).

JSX Structure

Root Div
Styles: bg-[rgb(41,40,65)] (dark background), sticky top-0 (sticks to top), z-[99] (high z-index), text-white (white text).

Container Component
Wraps content with flex layout: flex items-center justify-between gap-3.

Logo Section

<h1> with text-2xl font-semibold styles.
Contains a <Link to={"/"}> (empty) and text "MovieStream".

Navigation Links
Wrapped in a <div> with flex layout and responsive styles.
Styles: pt-1.5 flex items-center gap-1.5.
Responsive (max-768px): fixed bottom-0 left-0 right-0 justify-center py-3 bg-header gap-6.
Links: <Link to={"/movies"}> and <Link to={"/tv"}>, styled via getMenuClass.

Search Bar
Wrapped in a <div> with styles: border-b-[1.5px] border-white flex items-center p-1 flex-[0.5] focus-within:border-[#423F71] relative.
Input:
onClick: Stops event propagation, sets isSearchFocus to true.
onKeyDown: Calls goToSearchPage on Enter key.
onInput: Updates keyword state with input value.
value: Bound to keyword state.
Styles: bg-transparent outline-0 flex-1.
Placeholder: "search...".

Icon: <IoIosSearch size={18}> for search icon.
Commented Section: Conditional rendering of a SearchResult component if isSearchFocus and keyword are truthy.

Behavior

Navigation: Links to home (/), "Movies" (/movies), and "TV" (/tv) routes, with active styling based on the current path.
Search: Updates keyword as the user types, navigates to /search?q={keyword} on Enter, and resets focus/keyword on outside clicks.
Responsive: On screens <768px, the menu becomes fixed at the bottom with adjusted styling.
Side Effects: Tracks URL changes and handles global click events to manage search focus.

Notes

The <Link to={"/"}> in the logo is empty; consider moving "MovieStream" inside for clickability.
The SearchResult component is commented out and not implemented.
The max:px-6 class in MENU_CLASS may be a custom or invalid Tailwind syntax.
TypeScript uses string instead of String for type annotations (e.g., in getMenuClass).
