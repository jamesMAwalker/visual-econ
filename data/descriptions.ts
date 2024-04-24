interface IDataDescription {
  title: string
  subTitle: string
  description: string
  key_features: string[]
}

export const CHART_DESCRIPTIONS: Record<string, IDataDescription> = {
  'CAINC1': {
    title: 'Total Personal Income',
    subTitle: 'Total Personal Income',
    description: 'Total Personal Income represents the sum of all incomes received by individuals, including wages, salaries, dividends, interest, and other sources. It serves as a comprehensive measure of the economic well-being of individuals within a geographic area or economy. Understanding changes in total personal income over time can indicate trends in employment, productivity, and overall economic growth.',
    key_features: ['Comprehensive measure of individual incomes', 'Indicates economic well-being and trends']
  },
  'CAGDP1': {
    title: "Real Gross Domestic Product (GDP)",
    subTitle: "Thousands of chained 2017 dollars",
    description: 'Real Gross Domestic Product (GDP) measures the total value of all goods and services produced within an economy, adjusted for inflation. It is a crucial indicator of economic performance and productivity, reflecting the overall health and size of an economy. Changes in real GDP over time provide insights into economic growth, business cycles, and the effectiveness of economic policies.',
    key_features: ['Adjusts for inflation', 'Reflects economic performance and productivity']
  },
  'CAINC6N': {
    title: 'Compensation of Employees',
    subTitle: 'Total Personal Income',
    description: 'Compensation of Employees represents the total remuneration paid to individuals for their work, including wages, salaries, bonuses, and benefits. It is a significant component of Total Personal Income and serves as a key measure of labor market dynamics and the distribution of income. Tracking changes in compensation of employees helps assess trends in wages, labor market conditions, and income inequality.',
    key_features: ['Includes wages, salaries, bonuses, and benefits', 'Reflects labor market dynamics and income distribution']
  },
  'CAEMP25N': {
    title: 'Total Employment',
    subTitle: 'Total Personal Income',
    description: 'Total Employment measures the number of individuals who are employed in an economy or geographic area. It is a fundamental indicator of labor market activity and the overall health of an economy. Changes in total employment can signal shifts in economic conditions, such as growth, recession, or changes in industry demand.',
    key_features: ['Indicates labor market activity', 'Provides insights into economic conditions']
  },
}