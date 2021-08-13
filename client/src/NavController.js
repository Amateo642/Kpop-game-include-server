export class NavController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        Promise.all([this.model.getGroups(), this.model.getGirls()])
            .then(([groups, girls]) => {
                this.view.renderNavbar(groups, girls);
            });
        //this.AppView.renderGreetings();
    }

}
