import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUserPage from "./pages/AddUserPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RoleAccessPage from "./pages/RoleAccessPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UsersListPage from "./pages/UsersListPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import BlankPagePage from "./pages/BlankPagePage";
import ApplicationSettings from "./components/ApplicationSettings";
import DriversListPage from "./pages/DriversListPage";
import AdminsListPage from "./pages/AdminsListPage";
import AddAdminPage from "./pages/AddAdminPage";
import AddDriverPage from "./pages/AddDriverPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>

        {/* auth */}
        <Route exact path='/' element={<SignInPage />} />
        <Route exact path='/sign-in' element={<SignInPage />} />
        <Route exact path='/sign-up' element={<SignUpPage />} />
        <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />


        {/* admin management */}
        <Route exact path='/users-list' element={<ProtectedRoute><UsersListPage user="user" title="Users List" /></ProtectedRoute>} />
        <Route exact path='/admins-list' element={<ProtectedRoute><AdminsListPage user="admin" title="Admins List" /></ProtectedRoute>} />
        <Route exact path='/drivers-list' element={<ProtectedRoute><DriversListPage user="driver" /></ProtectedRoute>} />


        <Route exact path='/view-profile/:id' element={<ProtectedRoute><ViewProfilePage /></ProtectedRoute>} />
        <Route exact path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* crud user */}
        <Route exact path='/add-admin' element={<ProtectedRoute><AddAdminPage user="admin" /></ProtectedRoute>} />
        <Route exact path='/add-user' element={<ProtectedRoute><AddUserPage user="user" title="Add Users" /></ProtectedRoute>} />
        <Route exact path='/add-driver' element={<ProtectedRoute><AddDriverPage user="driver" title="Add Drivers" /></ProtectedRoute>} />


        <Route exact path='/role-access' element={<ProtectedRoute><RoleAccessPage /></ProtectedRoute>} />
        <Route exact path="/settings" element={<ProtectedRoute><ApplicationSettings /></ProtectedRoute>} />

        <Route exact path="/dashboard" element={<ProtectedRoute> <BlankPagePage /></ProtectedRoute> } />




        {/* <Route exact path='/assign-role' element={<AssignRolePage />} /> */}


        {/* <Route exact path='/' element={<HomePageOne />} /> */}
        {/* <Route exact path='/index-2' element={<HomePageTwo />} />
        <Route exact path='/index-3' element={<HomePageThree />} />
        <Route exact path='/index-4' element={<HomePageFour />} />
        <Route exact path='/index-5' element={<HomePageFive />} />
        <Route exact path='/index-6' element={<HomePageSix />} />
        <Route exact path='/index-7' element={<HomePageSeven />} />
        <Route exact path='/index-8' element={<HomePageEight />} />
        <Route exact path='/index-9' element={<HomePageNine />} />
        <Route exact path='/index-10' element={<HomePageTen />} />
        <Route exact path='/index-11' element={<HomePageEleven />} /> */}



        {/* <Route exact path='/alert' element={<AlertPage />} />
        <Route exact path='/avatar' element={<AvatarPage />} />
        <Route exact path='/badges' element={<BadgesPage />} />
        <Route exact path='/button' element={<ButtonPage />} />
        <Route exact path='/calendar-main' element={<CalendarMainPage />} />
        <Route exact path='/calendar' element={<CalendarMainPage />} />
        <Route exact path='/card' element={<CardPage />} />
        <Route exact path='/carousel' element={<CarouselPage />} />
        <Route exact path='/chat-empty' element={<ChatEmptyPage />} />
        <Route exact path='/chat-message' element={<ChatMessagePage />} />
        <Route exact path='/chat-profile' element={<ChatProfilePage />} />
        <Route exact path='/code-generator' element={<CodeGeneratorPage />} />
        <Route exact path='/code-generator-new' element={<CodeGeneratorNewPage />} /> */}

        {/* <Route exact path='/colors' element={<ColorsPage />} />
        <Route exact path='/column-chart' element={<ColumnChartPage />} />
        <Route exact path='/company' element={<CompanyPage />} />
        <Route exact path='/currencies' element={<CurrenciesPage />} />
        <Route exact path='/dropdown' element={<DropdownPage />} />
        <Route exact path='/email' element={<EmailPage />} />
        <Route exact path='/faq' element={<FaqPage />} />
        <Route exact path='/form-layout' element={<FormLayoutPage />} />
        <Route exact path='/form-validation' element={<FormValidationPage />} />
        <Route exact path='/form' element={<FormPage />} /> */}

        {/* <Route exact path='/gallery' element={<GalleryPage />} />
        <Route exact path='/gallery-grid' element={<GalleryGridPage />} />
        <Route exact path='/gallery-masonry' element={<GalleryMasonryPage />} />
        <Route exact path='/gallery-hover' element={<GalleryHoverPage />} />
        <Route exact path='/blog' element={<BlogPage />} />
        <Route exact path='/blog-details' element={<BlogDetailsPage />} />
        <Route exact path='/add-blog' element={<AddBlogPage />} />
        <Route exact path='/testimonials' element={<TestimonialsPage />} />
        <Route exact path='/coming-soon' element={<ComingSoonPage />} />
        <Route exact path='/access-denied' element={<AccessDeniedPage />} />
        <Route exact path='/maintenance' element={<MaintenancePage />} />
        <Route exact path='/image-generator' element={<ImageGeneratorPage />} />
        <Route exact path='/image-upload' element={<ImageUploadPage />} />
        <Route exact path='/invoice-add' element={<InvoiceAddPage />} />
        <Route exact path='/invoice-edit' element={<InvoiceEditPage />} />
        <Route exact path='/invoice-list' element={<InvoiceListPage />} />
        <Route exact path='/invoice-preview' element={<InvoicePreviewPage />} />
        <Route exact path='/kanban' element={<KanbanPage />} />
        <Route exact path='/language' element={<LanguagePage />} />
        <Route exact path='/line-chart' element={<LineChartPage />} />
        <Route exact path='/list' element={<ListPage />} />
        <Route exact path='/marketplace-details' element={<MarketplaceDetailsPage />} />
        <Route exact path='/marketplace' element={<MarketplacePage />} />
        <Route exact path='/notification-alert' element={<NotificationAlertPage />} />
        <Route exact path='/notification' element={<NotificationPage />} />
        <Route exact path='/pagination' element={<PaginationPage />} />
        <Route exact path='/payment-gateway' element={<PaymentGatewayPage />} />
        <Route exact path='/pie-chart' element={<PieChartPage />} />
        <Route exact path='/portfolio' element={<PortfolioPage />} />
        <Route exact path='/pricing' element={<PricingPage />} />
        <Route exact path='/progress' element={<ProgressPage />} />
        <Route exact path='/radio' element={<RadioPage />} />
        <Route exact path='/star-rating' element={<StarRatingPage />} />
        <Route exact path='/starred' element={<StarredPage />} />
        <Route exact path='/switch' element={<SwitchPage />} />
        <Route exact path='/table-basic' element={<TableBasicPage />} />
        <Route exact path='/table-data' element={<TableDataPage />} />
        <Route exact path='/tabs' element={<TabsPage />} />
        <Route exact path='/tags' element={<TagsPage />} />
        <Route exact path='/terms-condition' element={<TermsConditionPage />} />
        <Route exact path='/text-generator-new' element={<TextGeneratorNewPage />} />
        <Route exact path='/text-generator' element={<TextGeneratorPage />} />
        <Route exact path='/theme' element={<ThemePage />} />
        <Route exact path='/tooltip' element={<TooltipPage />} />
        <Route exact path='/typography' element={<TypographyPage />} />
        <Route exact path='/users-grid' element={<UsersGridPage />} />
        <Route exact path='/view-details' element={<ViewDetailsPage />} />
        <Route exact path='/video-generator' element={<VideoGeneratorPage />} />
        <Route exact path='/videos' element={<VideosPage />} />
        <Route exact path='/view-profile' element={<ViewProfilePage />} />
        <Route exact path='/voice-generator' element={<VoiceGeneratorPage />} />
        <Route exact path='/wallet' element={<WalletPage />} />
        <Route exact path='/widgets' element={<WidgetsPage />} />
        <Route exact path='/wizard' element={<WizardPage />} /> */}

        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
