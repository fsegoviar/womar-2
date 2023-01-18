import Grid from '@mui/material/Grid';
import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const SkeletonLoader = () => {
  return (
    <Grid container sx={{ my: 5 }}>
      <Grid item xs={12} md={9}>
        <Grid item xs={12} md={10}>
          <Skeleton
            variant="rectangular"
            className="w-10/12 rounded-2xl col-span-2"
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{ mt: 2 }}>
          <div className="flex flex-col gap-4">
            <Skeleton
              variant="rectangular"
              className="w-6/12 rounded-2xl col-span-2"
              height={50}
            />
            <Skeleton
              variant="rectangular"
              className="w-2/12 rounded-2xl col-span-2"
              height={50}
            />
            <Skeleton
              variant="rectangular"
              className="w-full rounded-2xl col-span-2"
              height={250}
            />
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3} className="pt-10 md:p-0">
        <Skeleton
          variant="rectangular"
          className="w-full rounded-2xl col-span-2"
          height={400}
        />
      </Grid>
    </Grid>
  );
};
