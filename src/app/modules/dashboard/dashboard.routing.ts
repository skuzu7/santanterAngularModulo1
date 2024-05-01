import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard.component';

const dashBoardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(dashBoardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
