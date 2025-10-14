
export default function Footer () {
     return (
    <footer className="bg-gray-100 border-t py-4 mt-6">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Household Services. All rights reserved.
      </div>
    </footer>
  );
}