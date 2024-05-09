import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Index from './components/index';
import UserLogin from './components/user.login';
import UserRegistration from './components/user.registration';
import UserProfile from './components/user.profile';
import About from './components/user.About';
import Admin from './components/Admin/admin';
import AdminLogin from './components/Admin/admin.login';
import AdminReg from './components/Admin/admin.reg';
import RequestEvent from './components/userAdmin/requestEvent';
import EventBudget from './components/userAdmin/eventBudget';
import ChatPage from './components/userAdmin/chatPage';
import Chat from './components/userAdmin/chat';
import Payment from './components/userAdmin/payment';
import Paymentdashboard from './components/Admin/paymentdashboard';
import UserAdminDashboard from './components/userAdmin/userAdminDashboard';
import Crew from './components/userAdmin/crew';
import UserDashboard from './components/Admin/userDashboard';
import ReqEventDashboard from './components/Admin/reqEventDashboard';
import FeedBack from './components/userAdmin/feedback';
import CrewCreate from './components/Admin/CrewCreate';
import CrewEdit from './components/Admin/CrewEdit';
import CrewDash from './components/Admin/CrewDash';
import PlaceDash from './components/Admin/PlaceDash';
import PlaceEdit from './components/Admin/PlaceEdit';
import PlaceCreate from './components/Admin/PlaceCreate';
import SponsorCreate from './components/Admin/SponsorCreate';
import SponsorDash from './components/Admin/SponsorDash';
import SponsorEdit from './components/Admin/SponsorEdit';
import FinanceDashboard from './components/Admin/finanaceManagement';
import Feedbackdashboard from './components/Admin/feedbackdashboard';
import ChatAdmin from './components/Admin/ChatAdmin';
import ChatPageAdmin from './components/Admin/ChatPageAdmin';
import Venue from './components/userAdmin/venue';
import ChatSponsor from './components/Admin/ChatSponsor';
import ChatSponse from './components/userAdmin/chatSponse';
import CrewAttend from './components/Admin/CrewAttend';



function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" >
          <Index />
        </Route>
        <Route path="/Feedbackdashboard" exact component={Feedbackdashboard} />
        <Route path="/ChatAdmin" exact component={ChatAdmin} />
        <Route path="/ChatPageAdmin" exact component={ChatPageAdmin} />
        <Route path="/RequestEvent" exact component={RequestEvent} />
        <Route path="/EventBudget" exact component={EventBudget} />
        <Route path="/FinanceDashboard" exact component={FinanceDashboard} />
        <Route path="/ReqEventDashboard" exact component={ReqEventDashboard} />
        <Route path="/Payment" exact component={Payment} />
        <Route path="/Paymentdashboard" exact component={Paymentdashboard} />
        <Route path="/UserDashboard" exact component={UserDashboard} />
        <Route path="/UserAdminDashboard" exact component={UserAdminDashboard} />
        <Route path="/UserLogin" exact component={UserLogin} />
        <Route path="/UserRegistration" exact component={UserRegistration} />
        <Route path="/About" exact component={About} />
        <Route path="/Admin" exact component={Admin} />
        <Route path="/AdminLogin" exact component={AdminLogin} />
        <Route path="/AdminReg" exact component={AdminReg} />
        <Route path="/UserProfile" exact component={UserProfile} />
        <Route path="/FeedBack" exact component={FeedBack} />
        <Route path="/ChatPage" exact component={ChatPage} />
        <Route path="/Chat" exact component={Chat} />
        <Route path="/CrewCreate" exact component={CrewCreate} />
        <Route path="/CrewEdit/:id" exact component={CrewEdit} />
        <Route path="/CrewDash" exact component={CrewDash} />        
        <Route path="/PlaceDash" exact component={PlaceDash} />        
        <Route path="/PlaceEdit/:id" exact component={PlaceEdit} />
        <Route path="/PlaceCreate" exact component={PlaceCreate} />
        <Route path="/SponsorCreate" exact component={SponsorCreate} />
        <Route path="/SponsorDash" exact component={SponsorDash} />
        <Route path="/SponsorEdit/:id" exact component={SponsorEdit} />        
        <Route path="/crew" exact component={Crew} />
        <Route path="/venue" exact component={Venue} />
        <Route path="/ChatSponsor" exact component={ChatSponsor} />
        <Route path="/ChatSponse" exact component={ChatSponse} />
        <Route path="/CrewAttend" exact component={CrewAttend} />
      </div>
    </Router>
  );
}

export default App;
