import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="container grid max-w-3xl px-4 gap-12 py-6 md:gap-24 md:px-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400">
            We're here to help you. You can contact us by email or phone during
            business hours.
          </p>
        </div>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <dt className="font-medium">Email</dt>
            <dd>
              <Link className="underline underline-offset-2" to="#">
                hello@example.com
              </Link>
            </dd>
          </div>
          <div className="space-y-2">
            <dt className="font-medium">Phone</dt>
            <dd>1-123-456-7890</dd>
          </div>
          <div className="col-span-2 space-y-2">
            <dt className="font-medium">Office</dt>
            <dd>123 Street Rd, City, Country, 12345</dd>
          </div>
        </dl>
      </div>
      <div className="space-y-4">
        <p className="text-gray-500 dark:text-gray-400">
          Follow us on social media to stay updated with our latest news and
          offers.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Link
            className="flex items-center space-x-2 text-sm font-medium"
            to="#"
          >
            <TwitterIcon className="w-4 h-4" />
            Twitter
          </Link>
          <Link
            className="flex items-center space-x-2 text-sm font-medium"
            to="#"
          >
            <FacebookIcon className="w-4 h-4" />
            Facebook
          </Link>
          <Link
            className="flex items-center space-x-2 text-sm font-medium"
            to="#"
          >
            <LinkedinIcon className="w-4 h-4" />
            LinkedIn
          </Link>
          <Link
            className="flex items-center space-x-2 text-sm font-medium"
            to="#"
          >
            <InstagramIcon className="w-4 h-4" />
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
