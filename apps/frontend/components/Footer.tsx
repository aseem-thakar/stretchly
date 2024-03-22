interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className: string; ariaHidden?: boolean }>;
}

interface Navigation {
  main: NavigationItem[];
  // social: NavigationItem[];
}

const navigation: Navigation = {
  main: [{ name: "Feedback", href: "https://tally.so/r/3XDYDY" }],
};

export default function Footer() {
  return (
    <footer className="bg-lightprimary">
      <div className="px-6 py-10 mx-auto overflow-hidden max-w-7xl sm:py-12 lg:px-8">
        <nav
          className="-mb-6 columns-2 flex justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-xs leading-5 text-center">
          &copy; {new Date().getFullYear()} Stretchly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
