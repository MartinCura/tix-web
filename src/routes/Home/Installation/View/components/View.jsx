import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {
  fetchUserInstallation,
  deleteInstallation,
  editInstallationName,
} from '../../../../../store/domain/installation/actions';
import InstallationListView from './InstallationListView';

class ViewInstallation extends Component {

  componentWillRecei

  renderTable() {
    const {
      installations,
      dispatchDeleteInstallation,
      editInstallation,
      user,
    } = this.props;

    console.log(installations);
    if (!installations || !installations.list || installations.list.length === 0) {
      return <span className='label label-important'>No hay instalaciones registradas en el sistema.</span>;
    }
    console.log(installations);
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Clave Publica</TableHeaderColumn>
            <TableHeaderColumn>Acciones</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover>
          { Object.keys(installations.list).map(key => (
            <InstallationListView
              key={key}
              installation={installations.list[key]}
              deleteInstallation={dispatchDeleteInstallation}
              userId={user.id}
              editInstallation={editInstallation}
            />
          ))}
        </TableBody>
      </Table>
    );
  }

  render() {
    console.log(this.props);
    return (
      <Card className='card-margins'>
        <CardTitle
          title='Mis Instalaciones'
        />
        <CardText>
          {this.renderTable()}
        </CardText>
      </Card>
    );
  }
}

ViewInstallation.propTypes = {
  installations: PropTypes.arrayOf({
    name: PropTypes.string,
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  dispatchDeleteInstallation: PropTypes.func,
  editInstallation: PropTypes.func,
};

const mapStateToProps = store => ({
  user: store.account.user,
  installations: store.installations,
});

const mapDispatchToProps = dispatch => ({
  loadInstallations: userId => dispatch(fetchUserInstallation(userId)),
  dispatchDeleteInstallation: (userId, installationId) => dispatch(deleteInstallation(userId, installationId)),
  editInstallation: (userId, installationId, name) => dispatch(editInstallationName(userId, installationId, name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewInstallation);
