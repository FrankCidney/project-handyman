import './App.scss';
import Landing from './components/pages/landing/Landing';
import { Route, Routes } from 'react-router-dom';
import UserType from './components/landing/user-type/UserType';
import ClientSignUp from './components/landing/sign-up/client-sign-up/ClientSignUp';
import HandymanSignUp from './components/landing/sign-up/handyman-sign-up/HandymanSignUp';
import Search from './components/home/client/search/Search';
import Categories from './components/home/client/categories/Categories';
import ClientProfile from './components/profiles/client-profile/ClientProfile';
import Details from './components/profiles/client-profile/details/Details';
import Notifications from './components/profiles/client-profile/notifications/Notifications';
import HandymanSignIn from './components/landing/sign-in/HandymanSignIn';
import ClientSignIn from './components/landing/sign-in/ClientSignIn';
// import RatingComponent from './components/core/rating-component/RatingComponent';
import SendRequest from './components/profiles/handyman-profile/handyman-client-view/send-request/SendRequest';
import Payment from './components/profiles/handyman-profile/handyman-client-view/payment/Payment';
import Rate from './components/profiles/handyman-profile/handyman-client-view/rate/Rate';
import HandymanClientView from './components/profiles/handyman-profile/handyman-client-view/HandymanClientView';
import ClientRequests from './components/home/handyman/client-requests/ClientRequests';
import RequireAuth from './components/core/RequireAuth/RequireAuth';
import Layout from './components/core/layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Withdraw from './components/home/handyman/Withdraw';
import NotFound from './components/pages/NotFound';
import ListingView from './components/job-listings/listing-view/ListingView';
import Bid from './components/job-listings/bid/Bid';
import Jobs from './components/job-listings/jobs/Jobs';
import ViewBids from './components/job-listings/view-bids/ViewBids';
import CreateListing from './components/job-listings/create-listing/CreateListing';
import NewListing from './components/job-listings/new-listing/NewListing';
import ViewBidsContainer from './components/job-listings/view-bids/ViewBidsContainer';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#888888',
      }
    }
  })
  // #785AA0
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      {/* auth/landing routes */}
      <Routes>
        <Route path='/' element={ <Landing /> }>
          <Route index element={<UserType />} />
          <Route path='signin/handyman' element={<HandymanSignIn />} />
          <Route path='signin/client' element={<ClientSignIn />} />
          <Route path='signup/client' element={<ClientSignUp />} />
          <Route path='signup/handyman' element={<HandymanSignUp />} />
        </Route>
      
      {/* home routes */}
        <Route path='/search' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><Search /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />
        <Route path='/categories' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><Categories /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />
        <Route path='/client-requests' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><ClientRequests /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />
        <Route path='/withdraw' element={
          <RequireAuth>
              <Withdraw />
          </RequireAuth>
        } />

      {/* profile routes */}
      {/* client profile */}
        {/* <Route path='/profile/client' element={
          <RequireAuth>
            <ClientProfile />
          </RequireAuth>
        }>
          <Route index element={<Details />} />
          <Route path='details' element={<Details />} />
          <Route path='notifications' element={<Notifications />} />
        </Route> */}
        {/* handyman client view */}
        <Route path='/profile/handyman-client-view/:handymanId' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><HandymanClientView /></>
                )
              }
            </Layout>
          </RequireAuth>
        }>
          <Route index element={<SendRequest />} />
          <Route path='send-request' element={<SendRequest />} />
          <Route path='payment' element={<Payment />} />
          <Route path='rate' element={<Rate />} />
        </Route>

        {/* new routes */}
        <Route path='view-listing' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><ListingView /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

        <Route path='job-listings' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><Jobs /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

        <Route path='bid/:jobId' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><Bid /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

        <Route path='view-bids/:jobId' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><ViewBidsContainer /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

        <Route path='create-listing' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><CreateListing /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

        <Route path='new-listing' element={
          <RequireAuth>
            <Layout>
              {
                () => (
                  <><NewListing /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

       {/* 404 route */}
       <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
