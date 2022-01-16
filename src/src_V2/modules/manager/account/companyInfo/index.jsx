import { Box } from '@mui/system';
import { Divider, IconButton, Link, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from './styles.module.css';
import ImgPlaceholder from '../imgPlaceholder';

const InfoRow = ({ label, value, type = 'text' }) => {
  return (
    <div className={styles['info-row']}>
      <Typography variant='subtitle2' className={styles['info-title']}>
        {label}
      </Typography>
      <div className={styles['values-row']}>
        <Typography variant='body2'>
          {type === 'email' ? <Link href={`mailto:${value}`}>{value}</Link> : value}
        </Typography>

        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(value);
          }}
          size='small'
          className={styles['copy-btn']}
        >
          <ContentCopyIcon fontSize='small' />
        </IconButton>
      </div>
    </div>
  );
};

export default function CompanyInfo({ address, email, phone, logo }) {
  return (
    <>
      <Box flexGrow={1} mt={4}></Box>
      <Divider />
      <div className={styles['content']}>
        <Typography className={styles['title']} variant='h6'>
          Company information
        </Typography>
        <div className={styles['info-wrapper']}>
          {/* <Grid item xs={2}> */}
          <ImgPlaceholder width={170} height={105} img={logo} />
          {/* </Grid> */}
          <div className={styles['info-table']}>
            {address && <InfoRow label='Address' value={address} />}
            {email && <InfoRow label='E-mail' type='email' value={email} />}
            {phone && <InfoRow label='Phone Number' value={phone} />}
          </div>
        </div>
      </div>
    </>
  );
}
