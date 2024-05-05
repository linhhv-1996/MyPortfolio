import PageLayout from 'components/layouts/pageLayout';
import Header from 'components/shared/header';

import {
  Box
} from '@chakra-ui/react';

const Privacy = () => {

  const pStyle = {
    fontWeight: 'bold',
    marginTop: '10px',
    marginBottom: '10px',
  }

  return (
    <PageLayout title="Privacy" keywords="Privacy Policy">

      <Header underlineColor={''} mt={0} mb={0}>
        Privacy Policy
      </Header>

      <Box mt={10} textAlign={'left'}>

        <p style={pStyle}>Obtaining user information</p>
        Acquisition of user information This site does not acquire personal information of users.

        <p style={pStyle}>Use of user information</p>
        This site does not use users' personal information.

        <p style={pStyle}>Provision of user information to third parties</p>
        This site does not provide users' personal information to third parties.

        <p style={pStyle}>Copyright</p>
        - The copyright of the content posted on this site belongs to this site.<br></br>
        - Unauthorized reproduction or redistribution of the content posted on this site is prohibited.<br></br>
        - If you have any inquiries or reports regarding the content posted on this site, please contact us using the contact information on this site.
        <p style={pStyle}>Disclaimer</p>
        This site is not responsible for any damage or trouble caused by using the content posted on this site.
        Although this site strives to always provide accurate and complete information about the posted content, we do not guarantee its accuracy or completeness.
        <p style={pStyle}>Tools used</p>
        This site uses Google Analytics (Google Inc.) as an analysis tool, and Google Analytics may automatically acquire user information.
        Please check the privacy policy of the analysis provider regarding the information acquired, purpose of use, provision to third parties, etc.

        <p style={pStyle}>Contact address</p>
        If you have any inquiries or reports regarding this site<br></br>please contact us via my email <pre>linhhv.work@gmail.com</pre>
      </Box>

    </PageLayout>
  )
}

export default Privacy
