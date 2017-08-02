export default class CsvGen {
  constructor (siteData, flowData, results) {
    this.siteData = siteData
    this.flowData = flowData
    console.log(this.flowData)
    this.results = results
    this.resultHeadings = `RESULTS,,,,,,,,,,,,
St,Clock,"Tape, ft",Max Depth,Spins,"Time, Sec",ft/sec,"station, ft","width, ft",q,Qcol,Perecent of flow,Reading Comments`
  }
  getSiteSummary () {
    const siteVisitSummary = this.siteData.siteVisitSummary
    const channelSummary = this.siteData.channelSummary
    const SITE_NAME = this.siteData.siteName
    const METER_TYPE = siteVisitSummary['Meter type'].name
    const const1 = siteVisitSummary['Meter type'].const1
    const const2 = siteVisitSummary['Meter type'].const2
    const SITE_ID = this.siteData.siteId
    const SPIN_TEST_AT_START = siteVisitSummary['Spin test at start']
    const DATE = siteVisitSummary['Date']
    const START_TIME = siteVisitSummary['Start time']
    const SPIN_TEST_AT_END = siteVisitSummary['Spin test at end']
    const STAFF_PLATE_READING = siteVisitSummary['Staff Plate Reading']
    const FIELD_CREW_MEASURE = siteVisitSummary['Field crew taking measurements']
    const MEASUREMENT_N = siteVisitSummary['Measurement #']
    const FIELD_CREW_NOTES = siteVisitSummary['Field crew taking notes']
    const ATMOSPHERE = siteVisitSummary['Atmospheric Cond']
    const SITE_COMMENTS = this.siteData.comments['Site comments']
    const SITE_REPAIRS_NEEDED = this.siteData.comments['Site repairs needed']
    const CROSS_SECTION_LOCATION = channelSummary['Cross section location']
    const START_EDGE = channelSummary['Start edge']
    const CROSS_SECTION_SUBSTRATE = channelSummary['Cross section substrate']
    const RIGHT_BANK_CONDITIONS = channelSummary['Right bank conditions']
    const GRADE_CONTROL = channelSummary['Grade control']
    const LEFT_BANK_CONDITIONS = channelSummary['Left bank conditions']
    const FLOW_CONSISTENCY = channelSummary['Flow consistency']
    const GAUGE_OPERATING = channelSummary['Gauge operating']
    const DATA_DOWNLOAD = channelSummary['Data downloaded']
    const RATED = channelSummary['Rated']
    const COMMENTS_ON_RATING = channelSummary['Comments on rating']
    return `Conservation Hydrology,Created via UpStream,,,
Trout Unlimited,https://github.com/mijdavis2/upstream,,,
,,,,
SITE VISIT SUMMARY,,,,
Site name,${SITE_NAME},,Meter Type:,${METER_TYPE}
Site ID,${SITE_ID},,Meter Equation:,${const1}*(n/x)+${const2}
Date and start time,${DATE} ${START_TIME},,Spin Test at start (Y/N):,${SPIN_TEST_AT_START}
Field crew taking measurement,${FIELD_CREW_MEASURE},,Spin Test at end (pass?):,${SPIN_TEST_AT_END}
Field crew taking notes,${FIELD_CREW_NOTES},,Measurement #,${MEASUREMENT_N}
Site Comments:,${SITE_COMMENTS},,Atmospheric Cond:,${ATMOSPHERE}
Site Repairs Needed:,${SITE_REPAIRS_NEEDED},,Staff Plate Reading (Depth),${STAFF_PLATE_READING}
,,,,
Channel Summary:,,,,
Cross Section Location:,${CROSS_SECTION_LOCATION},,Start Edge,${START_EDGE}
Cross Section Substrate:,${CROSS_SECTION_SUBSTRATE},,Right bank conditions:,${RIGHT_BANK_CONDITIONS}
Grade Control:,${GRADE_CONTROL},,Left bank conditions,${LEFT_BANK_CONDITIONS}
Flow Consistency:,${FLOW_CONSISTENCY},,Gauge Operating:,${GAUGE_OPERATING}
,,,Data Downloaded:,${DATA_DOWNLOAD}
"Rated:",${RATED},,Comments on Rating:,${COMMENTS_ON_RATING}
`
  }
  discharge () {
    const cell = this.flowData.length + 21
    return `,,,,,,,,Total Discharge:,,=SUM(K23:K${cell}),,`
  }
  getFtPerSec (st) {
    if (st === 0 || st === this.flowData.length - 1) {
      return 0
    }
    const const1 = this.siteData.siteVisitSummary['Meter type'].const1
    const const2 = this.siteData.siteVisitSummary['Meter type'].const2
    const numerator = `E${st + 23}`
    const denom = `F${st + 23}`
    return `=${const1}*(${numerator}/${denom})+${const2}`
  }
  getStFt (st) {
    return `=C${st + 23} - C23`
  }
  getWidthFt (st) {
    if (st === 0) {
      return this.results[0].widthFt
    }
    if (st === this.flowData.length - 1) {
      return `=(H${st + 23} - H${st + 22})/2`
    }
    if (st === 0) {
      return `=(H${st + 24} - H${st + 23})/2`
    }
    return `=(H${st + 23} - H${st + 22})/2 + (H${st + 24} - H${st + 23})/2`
  }
  getQ (st) {
    return `=G${st + 23}*D${st + 23}`
  }
  getQcol (st) {
    return `=J${st + 23}*I${st + 23}`
  }
  getPercentOfFlow (st) {
    return `=K${st + 23}/$K$${this.flowData.length + 23}`
  }
  genRow (st) {
    return `${st},${this.flowData[st].clock},${this.flowData[st].tapeFt},${this.flowData[st].maxDepth},${this.flowData[st].spins},${this.flowData[st].timeSec},${this.getFtPerSec(st)},${this.getStFt(st)},${this.getWidthFt(st)},${this.getQ(st)},${this.getQcol(st)},${this.getPercentOfFlow(st)},${this.flowData[st].readingComments}`
  }
  getRows () {
    let current = 0
    let rows = ''
    while (current <= this.flowData.length - 1) {
      rows = rows + this.genRow(current) + '\n'
      current++
    }
    return rows
  }
  genReport () {
    return this.getSiteSummary() + '\n' + this.resultHeadings + '\n' + this.getRows() + this.discharge()
  }
}
