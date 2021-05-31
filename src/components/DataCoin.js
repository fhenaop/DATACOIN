import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
import bsCustomFileInput from 'bs-custom-file-input';



class DataCoin extends Component {
  componentDidMount() {
      bsCustomFileInput.init()
    }

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content ">
              <p>&nbsp;</p>

              <div className="card text-white mx-auto bg-dark mb-3" style={{ maxWidth: '30rem' }}>
                <div className="card-header">Upload your file</div>
                <div className="card-body">

                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="Describe here your file."
                            required />
                      </div>
                      <div className="custom-file">
                        <input type="file" onChange={this.props.captureFile} className="custom-file-input" id="customFile"/>
                        <label className="custom-file-label" htmlFor="customFile"></label>
                      </div>
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary" ><b>Upload!</b></button>
                      </div>
                  </form>
                </div>
              </div>
              <p>&nbsp;</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default DataCoin;
