import React from 'react';
import { QUICK_METRICS } from '../../../data/vendorOverviewData';
import IconPlate from '../shared/IconPlate';

const VendorOverview = () => {
  return (
    <div className="overview-container">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-2 gap-4">
        {QUICK_METRICS.map((metric) => (
          <div key={metric.id} className="metric-card">
            <IconPlate>
              {metric.icon || <span className="text-gray-500">N/A</span>}
            </IconPlate>
            <div className="metric-info">
              <h2 className="text-lg font-semibold">{metric.label}</h2>
              <p className="text-sm text-gray-600">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorOverview;