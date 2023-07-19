import 'dotenv/config';
import { connect } from 'mongoose';

export default connect(process.env.DB_URL as string);
