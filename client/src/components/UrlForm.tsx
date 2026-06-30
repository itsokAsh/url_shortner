import { type ChangeEvent, JSX, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { isValidUrl } from '../utils';

interface UrlFormType {
  isSuccess: boolean;
  isLoading: boolean;
  trigger: (originalUrl: string) => void;
}

const UrlForm = ({
  isSuccess,
  isLoading,
  trigger,
}: UrlFormType): JSX.Element => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [onError, setOnError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setOriginalUrl('');
    }
  }, [isSuccess]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setOriginalUrl(event.target?.value);
    setOnError(false);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isValidUrl(originalUrl)) {
      trigger(originalUrl);
    } else {
      setOnError(true);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'flex-start' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            id="outlined-basic"
            placeholder="Enter a link to shorten it"
            variant="outlined"
            error={onError}
            helperText={onError ? 'Please enter a valid link' : ''}
            fullWidth
            required
            onChange={handleChange}
            value={originalUrl}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingIndicator="Loading..."
            fullWidth
            sx={{ height: '56px' }}
          >
            Shorten URL
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UrlForm;