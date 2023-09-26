// Tab Routes
import HomeTab from '../containers/tabbar/home/HomeTab';
import CalendarTab from '../containers/tabbar/calendar/CalendarTab';
import BookingsTab from '../containers/tabbar/order/BookingsTab';
import ProfileTab from '../containers/tabbar/profile/ProfileTab';

// // Screens Route
import Splash from '../containers/auth/Splash';
import OnBoarding from '../containers/OnBoarding';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import TabBar from './Type/TabBarNavigation';
import Connect from '../containers/auth/Connect';
import SelectInterest from '../containers/auth/SelectInterest';
import SetPin from '../containers/auth/SetPin';
import SetUpProfile from '../containers/auth/SetUpProfile';
import SetSecure from '../containers/auth/SetSecure';
import ForgotPassword from '../containers/auth/ForgotPassword';
import ForgotPasswordOtp from '../containers/auth/ForgotPasswordOtp';
import CreateNewPassword from '../containers/auth/CreateNewPassword';
import Birthday from '../containers/auth/Birthday';
import Gender from '../containers/auth/Gender';
import AddAddress from '../containers/tabbar/profile/AddAddress';
import AddNewCard from '../containers/tabbar/profile/AddNewCard';
import Address from '../containers/tabbar/profile/Address';
import HelpCenter from '../containers/tabbar/profile/HelpCenter';
import Language from '../containers/tabbar/profile/Language';
import NotificationSetting from '../containers/tabbar/profile/NotificationSetting';
import Payment from '../containers/tabbar/profile/Payment';
import PrivacyPolicy from '../containers/tabbar/profile/PrivacyPolicy';
import Security from '../containers/tabbar/profile/Security';
import InviteFriends from '../containers/tabbar/profile/InviteFriends';
import CustomerService from '../containers/tabbar/profile/CustomerService';
import EReceipt from '../containers/tabbar/wallet/EReceipt';
import Completed from '../containers/tabbar/order/Completed';
import UpComing from '../containers/tabbar/order/UpComing';
import MostPopular from '../containers/tabbar/home/MostPopular';
import MyWishlist from '../containers/tabbar/home/MyWishlist';
import Notification from '../containers/tabbar/home/Notification';
import SpecialOffers from '../containers/tabbar/home/SpecialOffers';
import ProductDetail from '../containers/tabbar/home/ProductDetail';
import ProductCategory from '../containers/tabbar/home/ProductCategory';
import Search from '../containers/tabbar/home/Search';
import Reviews from '../containers/tabbar/home/Reviews';
import CheckOut from '../containers/tabbar/calendar/CheckOut';
import AddPromo from '../containers/tabbar/calendar/AddPromo';
import ChooseShipping from '../containers/tabbar/calendar/ChooseShipping';
import AllService from '../containers/tabbar/home/AllService';
import CallingScreen from '../containers/tabbar/inbox/CallingScreen';
import Calls from '../containers/tabbar/inbox/Calls';
import InboxTab from '../containers/tabbar/inbox/InboxTab';
import Chats from '../containers/tabbar/inbox/Chats';
import Cancelled from '../containers/tabbar/order/Cancelled';
import Cleaning from '../containers/tabbar/category/Cleaning';
import Repairing from '../containers/tabbar/category/Repairing';
import BookingDetail from '../containers/tabbar/category/BookingDetail';
import Laundry from '../containers/tabbar/category/Laundry';
import Plumbing from '../containers/tabbar/category/Plumbing';
import Appliance from '../containers/tabbar/category/Appliance';
import Shifting from '../containers/tabbar/category/Shifting';
import ShiftingAddress from '../containers/tabbar/category/ShiftingAddress';
import Painting from '../containers/tabbar/category/Painting';
import EditProfile from '../containers/tabbar/profile/EditProfile';

export const TabRoute = {
  HomeTab,
  CalendarTab,
  BookingsTab,
  ProfileTab,
  InboxTab,
};

export const StackRoute = {
  Splash,
  OnBoarding,
  Login,
  Register,
  TabBar,
  Connect,
  SelectInterest,
  SetPin,
  SetUpProfile,
  SetSecure,
  ForgotPassword,
  ForgotPasswordOtp,
  CreateNewPassword,
  Birthday,
  Gender,
  AddAddress,
  AddNewCard,
  Address,
  HelpCenter,
  Language,
  NotificationSetting,
  Payment,
  PrivacyPolicy,
  Security,
  InviteFriends,
  CustomerService,
  EReceipt,
  Completed,
  UpComing,
  MostPopular,
  MyWishlist,
  Notification,
  SpecialOffers,
  ProductDetail,
  ProductCategory,
  Search,
  Reviews,
  CheckOut,
  AddPromo,
  ChooseShipping,
  AllService,
  CallingScreen,
  Calls,
  Chats,
  Cancelled,
  Cleaning,
  Repairing,
  BookingDetail,
  Laundry,
  Plumbing,
  Appliance,
  Shifting,
  ShiftingAddress,
  Painting,
  EditProfile,
};
