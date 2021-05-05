import React, { Component } from 'react';


export const  login = (props) => {

    const {onChange, onSubmit, email, password} = props;

    return (
        <div>
        <div className="container">
          <br />
          <br />
          <div className="row">
            <div className="col-md-5 m-auto">
            <img src="/AppLogo.jpeg" alt="" width="400" height="400" />

            </div>
            <div className="col-md-5 m-auto">
              <p className="lead text-center">Sign in to your GrocerSmart account</p>
              <br />
              <form onSubmit={onSubmit}>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                
                />
                <br></br>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
    
                />
                <button type="submit" className="btn btn-info btn-block mt-4">Submit</button>
              </form>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
   
    )

}



export default login
