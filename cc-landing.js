import React, { Component } from 'react'

import Layout from '../components/Layout'
import Terms from '../components/Terms'
import { Title, Image } from '../components/Utilities'
import Feature from '../components/Feature'
import Modal from '../components/Modal'

import PersonalOfferCard from '../components/Cards/PersonalOfferCard'
import CreditCardSm1x from '../assets/images/avant-cc-1x.png'
import CreditCardSm2x from '../assets/images/avant-cc-2x.png'
import CreditKarma1x from '../assets/images/cc-landing/credit-karma-1x.png'
import CreditKarma2x from '../assets/images/cc-landing/credit-karma-2x.png'

class CreditCardLanding extends Component {
  state = {
    openModal: false,
    validEntry: false,
  }

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
          dataEvent="credit card apply"
        />
      )
    }
  }

  render() {
    const { openModal, validEntry } = this.state

    return (
      <Layout>
        <main id="maincontent">
          <div className="cc-landing">
            <div className="container__inner">
              <div className="cc-landing__heading-box">
                <Title className="cc-landing__heading">
                  You have been pre-selected for an Avant Credit Card!
                </Title>
                <p className="cc-landing__text">
                  A credit card from Avant helps you build credit and pay for
                  what you need.
                </p>
              </div>

              <div className="cc-landing__content-box">
                <Image
                  className="cc-landing__img-cc"
                  imageArr={[CreditCardSm1x, CreditCardSm2x, 'Credit Card']}
                />
                <Image
                  className="cc-landing__img-karma"
                  imageArr={[CreditKarma1x, CreditKarma2x, 'Credit karma icon']}
                />
                <PersonalOfferCard
                  validOffer={this.validOffer}
                  inValidOffer={this.inValidOffer}
                  validEntry={validEntry}
                  primary
                  buttonTxt={'Start Application'}
                >
                  Start your journey to <span>better credit</span> now.
                </PersonalOfferCard>
              </div>

              <div className="decorative" />
            </div>
            <Feature />
          </div>
          <Terms />
          {openModal ? this.displayModal() : null}
        </main>
      </Layout>
    )
  }
}

export default CreditCardLanding
