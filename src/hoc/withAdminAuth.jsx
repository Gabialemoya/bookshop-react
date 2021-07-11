import {useAdminAuth} from './../customHooks/customHooks';

const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;