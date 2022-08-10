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

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#dbb6da',
      }
    }
  })
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
        <Route path='/search/:categoryId' element={
          <RequireAuth>
            <Layout>
              {
                (toggleDrawer) => (
                  <><Search toggleDrawer={toggleDrawer} /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />
        <Route path='/categories' element={
          <RequireAuth>
            <Layout>
              {
                (toggleDrawer) => (
                  <><Categories toggleDrawer={toggleDrawer} /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />
        <Route path='/client-requests' element={
          <RequireAuth>
            <Layout>
              {
                (toggleDrawer) => (
                  <><ClientRequests toggleDrawer={toggleDrawer} /></>
                )
              }
            </Layout>
          </RequireAuth>
        } />

      {/* profile routes */}
      {/* client profile */}
        <Route path='/profile/client' element={
          <RequireAuth>
            <ClientProfile />
          </RequireAuth>
        }>
          <Route index element={<Details />} />
          <Route path='details' element={<Details />} />
          <Route path='notifications' element={<Notifications />} />
        </Route>
        {/* handyman client view */}
        <Route path='/profile/handyman-client-view/:handymanId' element={
          <RequireAuth>
            <Layout>
              {
                (toggleDrawer) => (
                  <><HandymanClientView toggleDrawer={toggleDrawer} /></>
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
        {/* other profile routes */}
        {/* <Route path='/rating' element={<RatingComponent />} /> */}

      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
