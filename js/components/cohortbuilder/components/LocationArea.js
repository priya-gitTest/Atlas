define(['knockout', '../options', '../InputTypes/Range', '../CriteriaGroup', 'text!./LocationAreaTemplate.html'], function (ko, options, Range, CriteriaGroup, template) {

	function LocationAreaViewModel(params) {

		var self = this;
		self.expression = ko.utils.unwrapObservable(params.expression);
		self.Criteria = params.criteria.LocationArea;
		self.options = options;

		self.formatOption = function (d) {
			return '<div class="optionText">' + d.text + '</div>' +
				'<div class="optionDescription">' + d.description + '</div>';
		};

		self.addActions = [
			{
				text: "Add Start Date Criteria",
				selected: false,
				description: "Filter Condition Eras by the Start Date.",
				action: function () {
					if (self.Criteria.StartDate() == null)
						self.Criteria.StartDate(new Range({
							Op: "lt"
						}));
				}
			},
			{
				text: "Add End Date Criteria",
				selected: false,
				description: "Filter Condition Eras  by the End Date",
				action: function () {
					if (self.Criteria.EndDate() == null)
						self.Criteria.EndDate(new Range({
							Op: "lt"
						}));
				}
			},
			{
				text: "Add Nested Criteria...",
				selected: false,
				description: "Apply criteria using the condition occurrence as the index date",
				action: function () {
					if (self.Criteria.CorrelatedCriteria() == null)
						self.Criteria.CorrelatedCriteria(new CriteriaGroup(null, self.expression.ConceptSets));
				}
			}
		];

		self.removeCriterion = function (propertyName) {
			self.Criteria[propertyName](null);
		}
	}

	// return compoonent definition
	return {
		viewModel: LocationAreaViewModel,
		template: template
	};
});
