import { CertificateStatus } from "../constants/base";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export const getCertificateBgColor = (value: any) => {
    let bgClassName;
    switch (value) {
        case CertificateStatus.Requested: {
            bgClassName = 'bg-danger'
            break;
        }
        case CertificateStatus.PendingContractor: {
            bgClassName = 'bg-warning'
            break;
        }
        case CertificateStatus.Assigned: {
            bgClassName = 'bg-warning'
            break;
        }
        case CertificateStatus.InProgress: {
            bgClassName = 'bg-primary-75'
            break;
        }
        case CertificateStatus.Approved: {
            bgClassName = 'bg-success'
            break;
        }
        case CertificateStatus.ApprovedBlockchainRegistered: {
            bgClassName = 'bg-success'
            break;
        }
        case CertificateStatus.Rejected: {
            bgClassName = 'bg-primary'
            break;
        }
        case CertificateStatus.RejectedBlockchainRegistered: {
            bgClassName = 'bg-primary'
            break;
        }
        case CertificateStatus.Cancelled: {
            bgClassName = 'bg-primary'
            break;
        }
        case CertificateStatus.Expired: {
            bgClassName = 'bg-expired'
            break;
        }
        default: {
            bgClassName = 'bg-success'
            break;
        }
    }
    return bgClassName
}

export const getIotBgColorAndText = (critial: any) => {

    let bgClassName;
    let text ;
    if (critial >= 0 && critial <= 2) {
        bgClassName = 'bg-success';
        text = 'Normal';
    }
    else if (critial > 2 && critial <= 4) {
        bgClassName = 'bg-warning-75';
        text = 'Minor';
    }
    else if (critial > 4  && critial <=7) {
        bgClassName = 'bg-warning-100';
        text = 'Major';
    }
    else if (critial > 7 && critial <=10) {
        bgClassName = 'bg-danger';
        text = 'Critical';
    }
    else if (critial === 3 && critial === 4) {
        bgClassName = 'bg-success';
        text = 'Normal';
    }

    return { bgClassName, text };
}

export function validateEmail(email: string) {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
}

export function validatePassword(password: string) {
    return password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-=~_+[\]\\{}|;':",./<>?])[A-Za-z\d!@#$%^&*()-=~_+[\]\\{}|;':",./<>?]{6,}$/,
    )
}

export const getToken = () => JSON.parse(localStorage.getItem('token') || '""')

export default function stateCounter(task: any){
    
    const filterState = ["requested", "assigned", "in-progress"];
    const { taskId, events, state } = task;
    let status = { taskId, request: '', assign: '', rColor: 'limegreen', aColor: 'limegreen' };
    let reqDate: any = new Date(events[0].date).getTime();
    let assignDate: any = -1;
    
    if (task.assignedTo) {
        let counter = 0;
        for(var i = 0; i < events.length; i++){
            let event = events[i];
            if(event.type !== 'state-change') continue;
            for(var j = 0; j < event.changedFields.length; j++){
                let field = event.changedFields[j];
                if(field.fieldName === 'state' && field.newValue === 'assigned'){
                    assignDate = new Date(event.date).getTime();
                    break;
                }
            }

            if(assignDate > 0) break;
        }
    }

    let _surfix = '';
    if(filterState.includes(state)){
        _surfix = 'ago';
        reqDate = Math.floor((Date.now() - reqDate) / (24 * 3600 * 1000));

        if(assignDate > 0){
            assignDate = Math.floor((Date.now() - assignDate) / (24 * 3600 * 1000));
        }
    }else{
        _surfix = 'cur';
        let lastDate = new Date(events[events.length - 1].date).getTime();
        reqDate = Math.floor((lastDate - reqDate) / (24 * 3600 * 1000));
        if(assignDate > 0){
            assignDate = Math.floor((lastDate - assignDate) / (24 * 3600 * 1000));
        }
    }
    
    status.aColor = assignDate > 5 ? 'tomato' : 'limegreen';
    status.rColor = reqDate > 5 ? 'tomato' : 'limegreen';

    if(reqDate < 2) reqDate = '1 day ago';
    else reqDate = reqDate + ' days ago';
    status.request = reqDate;

    if(assignDate > -1){
        if(assignDate < 2) assignDate = '1 day ago';
        else assignDate = assignDate + ' days ago';
        status.assign = assignDate;
    }

    return status;
}

export const getSortData = (data: any, sortColumn: any, sortType: any) => {
    if (sortColumn && sortType) {
        return data.sort((a: any, b: any) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === 'string') {
            x = x.toLocaleLowerCase();
          }
          if (typeof y === 'string') {
            y = y.toLocaleLowerCase();
          }
          if (sortType === 'asc') {
            return x > y ? 1 : -1;
          } else {
            return x < y ? 1 : -1;
          }
        });
    }
    return data;
}

export const getDateTimeString = (date: Date) => {
    const dateStr = date.toISOString().substr(0, 10);

    var hours: any   = date.getHours()
    var minutes: any = date.getMinutes();
    var seconds: any = date.getSeconds();

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return dateStr + ' ' + hours+':'+minutes+':'+seconds;
}

export const getTimeAgo = (date: Date) => {
    const timeAgo = new TimeAgo('en-US')
    return timeAgo.format(date);
}