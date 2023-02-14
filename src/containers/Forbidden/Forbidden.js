import { Link } from 'react-router-dom';
import './style.css'

const Forbidden = () =>
(
	<div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>403 - Access Denied</h2>
			</div>
			<Link to="/">Go TO Homepage</Link>
		</div>
	</div>
);

export default Forbidden;