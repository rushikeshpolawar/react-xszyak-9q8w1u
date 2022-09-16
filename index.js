import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {
  GanttComponent,
  Inject,
  Selection,
  ColumnsDirective,
  ColumnDirective,
  Filter,
} from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from './sample-base';
export class Default extends SampleBase {
  constructor() {
    super();
    this.getSelectedElements = this.getSelectedElements.bind(this);
    this.filterElements = this.filterElements.bind(this);
    this.filterElements2 = this.filterElements2.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.setCellValue = this.setCellValue.bind(this);
    this.clearFilterByOne = this.clearFilterByOne.bind(this);
    this.multipleFilterByOne = this.multipleFilterByOne.bind(this);
    this.refreshGantt = this.refreshGantt.bind(this);
  }
  taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
  };
  toolbarOptions = [
    'ExpandAll',
    'CollapseAll',
    'ZoomIn',
    'ZoomOut',
    'ZoomToFit',
    'CsvExport',
    'Search',
  ];
  labelSettings = {
    leftLabel: 'TaskName',
  };
  projectStartDate = new Date('03/24/2019');
  projectEndDate = new Date('07/06/2019');
  dataBound() {
    this.ganttInstance.treeGrid.autoCheckHierarchy = true;
  }
  getSelectedElements() {
    console.log(this.ganttInstance.treeGrid.selectionModule.selectedItems);
  }

  filterElements() {
    // this.ganttInstance.filterByColumn('TaskID', 'contains', [3, 4, 9],false,);
    // this.ganttInstance.
  }
  filterElements2() {
    this.ganttInstance.filterByColumn('TaskName', 'contains', 'Test');
  }

  clearFilter() {
    this.ganttInstance.treeGrid.clearFiltering();
  }

  setCellValue() {
    let getGanttObj = this.ganttInstance.dataSource.filter(
      (element) => element.TaskID === 6
    );
    this.ganttInstance.treeGrid.setRowData(6, {
      ...getGanttObj[0],
      TaskName: 'Test',
    });
  }

  clearFilterByOne() {
    this.ganttInstance.removeFilteredColsByField('TaskName');
  }

  multipleFilterByOne() {
    this.ganttInstance.filterByColumn('TaskID', 'equal', [3, 4, 9]);
  }

  refreshGantt() {
    this.ganttInstance.refresh();
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <GanttComponent
            id="Default"
            dataSource={projectNewData}
            treeColumnIndex={1}
            taskFields={this.taskFields}
            labelSettings={this.labelSettings}
            height="410px"
            toolbar={this.toolbarOptions}
            projectStartDate={this.projectStartDate}
            projectEndDate={this.projectEndDate}
            allowFiltering={true}
            dataBound={this.dataBound.bind(this)}
            ref={(gantt) => (this.ganttInstance = gantt)}
          >
            <ColumnsDirective>
              <ColumnDirective field="TaskID" width="80"></ColumnDirective>
              <ColumnDirective
                field="TaskName"
                headerText="Job Name"
                width="250"
                clipMode="EllipsisWithTooltip"
                showCheckbox={true}
              ></ColumnDirective>
              <ColumnDirective field="StartDate"></ColumnDirective>
              <ColumnDirective field="Duration"></ColumnDirective>
              <ColumnDirective field="Progress"></ColumnDirective>
              <ColumnDirective field="Predecessor"></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Filter]} />
          </GanttComponent>
        </div>
        <br />
        <button onClick={this.getSelectedElements}>
          {' '}
          Get Checked elements{' '}
        </button>
        <br />
        <button onClick={this.filterElements}> filter 1 </button>
        <br />
        <button onClick={this.filterElements2}> filter 2 </button>
        <br />
        <button onClick={this.clearFilter}> Clear filter </button>
        <button onClick={this.refreshGantt}> Refresh </button>
        <br />
        <button onClick={this.setCellValue}> set cell value </button>
        <br />
        <button onClick={this.clearFilterByOne}>
          {' '}
          Clear Filter one by one{' '}
        </button>
        <br />
        <br />
        <button onClick={this.multipleFilterByOne}>
          {' '}
          mutliple filter by one{' '}
        </button>
        <br />
      </div>
    );
  }
}

const root = createRoot(document.getElementById('sample'));
root.render(<Default />);
