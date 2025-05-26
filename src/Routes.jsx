import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import { Notfound } from "./Components/NotFound";
import ErrorBoundary from "./Components/ErrorBoundary"; // Import the Error Boundary
import HomePage from "./Pages/HomePage";

// Auth Forms
const AuthForm = lazy(() => import("./Auth/AuthForm"));


// Wishlist page
const Wishlist = lazy(() => import('./Components/Wishlist'));

// Lazy load all secondary pages
const Collections = lazy(() => import("./Pages/Collections/Collections"));
const BestSeller = lazy(() => import("./Pages/Collections/BestSeller"));
const NewArrivals = lazy(() => import("./Pages/Collections/NewArrivals"));

// Product Categories
const Mobiles = lazy(() => import("./Pages/Categories/Mobiles"));
const Laptops = lazy(() => import("./Pages/Categories/Laptops"));
const Cameras = lazy(() => import("./Pages/Categories/Cameras"));
const Tablets = lazy(() => import("./Pages/Categories/Tablets"));
const Drones = lazy(() => import("./Pages/Categories/Drones"));
const Headphones = lazy(() => import("./Pages/Categories/Headphones"));
const Others = lazy(() => import("./Pages/Categories/Others"));
const CollectionCategoryPage = lazy(() => import("./Pages/Categories/CollectionCategoryPage"));

// Particular ProductDetail
const ProductDetail = lazy(() => import("./Pages/Product/ProductDetail"));

// Legal & Info Pages
const FAQs = lazy(() => import("./Pages/Legal/FAQs"));
const Privacy = lazy(() => import("./Pages/Legal/Privacy"));
const TermsService = lazy(() => import("./Pages/Legal/TermsServices"));

const Search = lazy(() => import("./Pages/Info/Search"));
const ContactUs = lazy(() => import("./Pages/Info/ContactUs"));
const AboutUs = lazy(() => import("./Pages/Info/AboutUs"));


// Seller Page related
const SellerDashboard = lazy(() => import("./Seller/SellerDashboard"));
const UploadProduts = lazy(() => import("./Seller/UploadedProduts"));
const CreateForm = lazy(() => import("./Seller/CreateForm"));
const UpdateForm = lazy(() => import("./Seller/UpdateFrom"));
// Helper function to wrap lazy components in Suspense
const LazyLoad = (Component) => (
  <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
    <Component />
  </Suspense>
);

// For Product Dynamic Routings
const productRoutes = [
  "collections",
  "new-arrivals",
  "mobiles",
  "laptops",
  "cameras",
  "ipads",
  "headphones",
  "drones",
];

const dynamicProductRoutes = productRoutes.map((path) => ({
  path: `${path}/:id`,
  element: LazyLoad(ProductDetail),
  errorElement: <ErrorBoundary />,
}));



// Define router
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />, // Added Error Boundary
    children: [
      { index: true, element: <HomePage /> },
      { path: "wishlist", element: LazyLoad(Wishlist) },
      { path: "auth", element: LazyLoad(AuthForm) },
      // Collections & Products Routes
      {
        path: "collections",
        element: LazyLoad(Collections),
        errorElement: <ErrorBoundary />, // Error handling for collections
        children: [
          // { index: true, element: LazyLoad(BestSeller) },
          { path: "new-arrivals", element: LazyLoad(NewArrivals) },
          // { path: "mobiles", element: LazyLoad(Mobiles) },
          // { path: "laptops", element: LazyLoad(Laptops) },
          // { path: "cameras", element: LazyLoad(Cameras) },
          // { path: "headphones", element: LazyLoad(Headphones) },
          // { path: "ipads", element: LazyLoad(Tablets) },
          // { path: "drones", element: LazyLoad(Drones) },
          { path: "others", element: LazyLoad(Others) },
          { path: ":category", element: LazyLoad(CollectionCategoryPage) },
        ],
      },

      // This line will inject all product detail routes dynamically
      ...dynamicProductRoutes,

      // Legal Pages
      { path: "faqs", element: LazyLoad(FAQs), errorElement: <ErrorBoundary /> },
      { path: "privacy-policy", element: LazyLoad(Privacy), errorElement: <ErrorBoundary /> },
      { path: "terms-of-service", element: LazyLoad(TermsService), errorElement: <ErrorBoundary /> },

      // Info Pages
      { path: "search", element: LazyLoad(Search), errorElement: <ErrorBoundary /> },
      { path: "contact-us", element: LazyLoad(ContactUs), errorElement: <ErrorBoundary /> },
      { path: "about-us", element: LazyLoad(AboutUs), errorElement: <ErrorBoundary /> },

      // Seller Page Related
      {
        path: "/seller",
        element: LazyLoad(SellerDashboard),
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: LazyLoad(UploadProduts) },
          { path: "add-product", element: LazyLoad(CreateForm) },
          { path: "edit-product/:productId", element: LazyLoad(UpdateForm) },
        ]
      },
    ],
  },
  { path: "*", element: <Notfound />, errorElement: <ErrorBoundary /> }, // Handle unknown routes
]);

export default Router;
