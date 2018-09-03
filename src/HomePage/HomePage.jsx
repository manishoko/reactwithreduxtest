import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
class HomePage extends React.Component {
 constructor(props){
   super(props);
   this.state = {
 usr: {
             FirstName: '',
             LastName: '',
             UserName: '',
             id:'',

         },

         submitted: false

   };
   this.handleSerachUser=this.handleSerachUser.bind(this);
   this.handleEditUser=this.handleEditUser.bind(this);
   this.handleGetAllUser=this.handleGetAllUser.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
      }
  handleGetAllUser() {
    return (e) => this.props.dispatch(userActions.getAll());
  }
  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }
  handleSerachUser(e){
    return (e) =>this.props.dispatch(userActions.getSearchAll(e.target.value));
  }
  handleEditUser(id){
     return (e) =>this.props.dispatch(userActions.getsingle(id));
  }

  handleChange(event) {

    this.setState(this.props);
      const { name, value } = event.target;
      const { usr } = this.state;
      this.setState({
          usr: {
              ...usr,
              [name]: value
          },

      });


  }

  handleSubmit(event) {

        event.preventDefault();

      this.setState({ submitted: true });
      const usr = {
      'id': this.refs.id.value,
      'FirstName': this.refs.FirstName.value,
      'LastName': this.refs.LastName.value,
      'UserName': this.refs.UserName.value
      }
    //  const { usr } = this.state;
      const { dispatch } = this.props;
  //  dispatch(userActions.updateSingle(eventVo));
      if (usr.FirstName && usr.LastName && usr.UserName && usr.id ) {
          dispatch(userActions.updateSingle(usr));
      }
  }



    render() {
        const { user, users,singleks,usr ,registering} = this.props;
        const {  submitted } = this.state;
        var filterText='hello';
        return (

            <div className="col-md-12 ">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>


                 {user.role==1 ?
                <p>
                  <Link to="/" className="btn btn-link">Home</Link>
                  <Link to="/register" className="btn btn-link">Register</Link>
                  <Link to="/login" className="btn btn-link">Logout</Link>

                </p>
                : ( <Link to="/login" className="btn btn-link">Logout</Link> )}
                {users.loading &&  user.role==1 ? ( <em>Loading users...</em>  ) : ( <em></em> )}
                {users.error && user.role==1 ? (<span className="text-danger">ERROR: {users.error}</span>) : ( <span className="text-danger"></span> )}

            {users.items && user.role==1  ? (<div className='well'>
                               <label>Search User..</label>
                                <input type='text' className='form-control' pleaseholder='Search value..' value={this.filterText} onKeyUp={this.handleSerachUser()}></input></div>) : ( <span className="text-danger"></span> )}

{user.role==1 ? ( <h3>All registered users:</h3> ) : ( <h3></h3> )}
              {users.items && user.role==1 &&
  <div className='well'>

                    <table className="table table-bordered " >

                        <thead>
                           <tr>
                              <td>First Name</td>
                              <td>Last Name</td>
                              <td>User Name</td>
                              <td>User Type</td>
                              <td>Action</td>
                           </tr>
                        </thead>
                        <tbody>
                        {users.items.map((user, index) =>

                            <tr key={user.id}>
                              <td>{user.FirstName} </td>
                              <td>{user.LastName}</td>
                              <td>{user.UserName}</td>
                              <td>{user.Role==1 ?  <span>Admin</span> : <span>User</span> }</td>
                              <td> {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                  : <span> <a onClick={this.handleDeleteUser(user.id)} className="btn btn-danger btn-xs">Delete</a>

                                </span>

                                }
                                <a onClick={this.handleEditUser(user.id)} className="btn btn-info btn-xs ml5">Edit</a>
                              </td>
                            </tr>

                        )}

                        </tbody>
                    </table>
</div>
                }



                {users.itm &&

usr.itm.map((updateuser,index) =>
<div key={updateuser.id} className='well'>
  <h3>Update User Details</h3>
  <hr />
      <form name="form" onSubmit={this.handleSubmit}>

          <div className={'form-group' + (submitted && !updateuser.FirstName ? ' has-error' : '')}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" ref="FirstName" defaultValue={updateuser.FirstName} name="FirstName"  onChange={this.handleChange} />
              {submitted && !updateuser.FirstName &&
                  <div className="help-block">First Name is required</div>
              }
          </div>
          <div className={'form-group' + (submitted && !updateuser.LastName ? ' has-error' : '')}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" ref="LastName" name="LastName"  defaultValue={updateuser.LastName}  onChange={this.handleChange} />
              {submitted && !updateuser.LastName &&
                  <div className="help-block">Last Name is required</div>
              }
          </div>
          <div className={'form-group' + (submitted && !updateuser.UserName ? ' has-error' : '')}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" ref="UserName" name="UserName" defaultValue={updateuser.UserName} onChange={this.handleChange} />
              {submitted && !updateuser.UserName &&
                  <div className="help-block">Username is required</div>
              }
          </div>
          <input type="hidden" className="form-control" ref="id" name="id" defaultValue={updateuser.id} onChange={this.handleChange}  />
  <br />
        <div className="form-group">
              <button className="btn btn-primary">Update</button>
              {registering &&
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <a onClick={this.handleGetAllUser()} className="btn btn-link ">Cancel</a>
          </div>
      </form>
      </div>
        )}


            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication ,usr } = state;
    const { user } = authentication;
    return {
        user,
        users,
        usr
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
