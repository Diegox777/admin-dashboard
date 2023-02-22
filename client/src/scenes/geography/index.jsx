import { Box, useTheme } from '@mui/material';
import React from 'react'
import { useGetGeographyQuery } from '../../state/api';
import Header from '../../components/Header';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from '../../data';

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={'Geography'} subtitle={'Find where your users are located.'} />
      <Box mt="40px" height={'75vh'} border={`1px solid ${theme.palette.secondary[400]}`} borderRadius={'4px'}>
        {data ? (
          <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[50]
                  }
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[50]
                  }
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[50],
                    strokeWidth: 1
                  },
                  text: {
                    fill: theme.palette.secondary[50]
                  }
                }
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[50]
                }
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main
                }
              }
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="YlGn"
            domain={[0, 60]}
            unknownColor="#666666"
            projectionScale={150}
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor={theme.palette.primary[200]}
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme.palette.secondary[50],
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Geography;