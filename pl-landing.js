import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PlLandingHero from '../components/Heros/PlLandingHero'
import Modal from '../components/Modal'

class PersonalLoanLanding extends Component {
  state = {
    openModal: false,
    validEntry: false,
  }

  // setting a reference to the main content for drop in header
  dropInHeader = React.createRef()

  validOffer = boolean => {
    this.setState({
      validEntry: boolean,
      ssn: '',
      personalOfferCode: '',
      openModal: true,
    })
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }

  displayModal = () => {
    if (this.state.validEntry) {
      return (
        <Modal
          closeModal={this.closeModal}
          heading={'Your personal offer code has been entered successfully!'}
          text={'We are now taking you to your application…'}
        />
      )
    } else {
      return (
        <Modal
          closeModal={this.closeModal}
          heading={'That combination did not match a valid personal offer.'}
          text={
            'Please make sure that you entered your information correctly and that your offer has not expired.'
          }
          notValid
          dataEvent="apply"
        />
      )
    }
  }

  render() {
    const { openModal, validEntry } = this.state

    const {
      data: {
        site: {
          siteMetadata: { customersHelped },
        },
      },
    } = this.props

    return (
      <Layout dropInHeader={this.dropInHeader} hasFullLegal pLanding>
        <PlLandingHero
          validOffer={this.validOffer}
          inValidOffer={this.inValidOffer}
          validEntry={validEntry}
        />
        <main ref={this.dropInHeader} id="maincontent">
          <section className="data-spotlight data-spotlight--landscape">
            <div className="data-spotlight__content-box data-spotlight__content-box--border-sm">
              <h2 className="datapoints-sub">Customers Satisfied**</h2>
              <p className="datapoints--terms">95%</p>
            </div>
            <div className="data-spotlight__content-box data-spotlight__content-box--border-sm">
              <h2 className="datapoints-sub">Customers Nationwide</h2>
              <p className="datapoints--terms">{customersHelped}+</p>
            </div>
            <div className="data-spotlight__content-box">
              <h2 className="datapoints-sub">Borrowed</h2>
              <p className="datapoints--terms">$4 Billion</p>
            </div>
          </section>
          {openModal ? this.displayModal() : null}
        </main>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        customersHelped
      }
    }
  }
`

export default PersonalLoanLanding
