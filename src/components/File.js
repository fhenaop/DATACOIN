import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
import bsCustomFileInput from 'bs-custom-file-input';

class File extends Component {
  componentDidMount() {
      bsCustomFileInput.init()
      document.title = `This is a test`
    }


  render() {

    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content ">
              <p>{this.props.location}</p>
                <p>&nbsp;</p>



              <div className="table-responsive">
                <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                  <thead style={{ 'fontSize': '15px' }}>
                    <tr className="bg-dark text-white">
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">description</th>
                      <th scope="col">type</th>
                      <th scope="col">size</th>
                      <th scope="col">date</th>
                      <th scope="col">uploader/view</th>
                      <th scope="col">hash/view/get</th>
                    </tr>
                  </thead>
                  { this.props.files.map((file, key) => {
                    return(
                      <tbody style={{ 'fontSize': '12px' }} key={key}>
                        <tr>
                          <td>{file.fileId}</td>
                          <td>{file.fileName}</td>
                          <td>{file.fileDescription}</td>
                          <td>{file.fileType}</td>
                          <td>{convertBytes(file.fileSize)}</td>
                          <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                          <td>
                            <a
                              href={"https://etherscan.io/address/" + file.uploader}
                              rel="noopener noreferrer"
                              target="_blank">
                              {file.uploader.substring(0,10)}...
                            </a>
                           </td>
                          <td>
                            <a
                              href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                              rel="noopener noreferrer"
                              target="_blank">
                              {file.fileHash.substring(0,10)}...
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
                </table>
              </div>
              <p>&nbsp;</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default File;
