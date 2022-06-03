$(document).ready(function () {
    // Handler for .ready() called.

    let selectionRow = $('.selections-row')

    var filters = {}

    $(".fancy-accordion--header").click(function () {
        $(this).closest('.fancy-accordion').toggleClass("__open");
    });


    $('#show_date_picker').daterangepicker({
        "autoApply": true,
        "autoUpdateInput": false,
        "startDate": "03/29/2022",
        "endDate": "04/04/2022"
    }, function (start, end, label) {
        $('#date_selected').removeClass('d-none');
        $('#date_selected span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
        // kpi_tool_store_filters();
    });



    $(".dropdown-options--list.single")
        .on("click", ".dropdown-options--list-item",
            function () {
                var filterName = $(this).parent().data("option-for");
                var selectedOption = $(this).data("option");

                updateSingleSelection(filterName, selectedOption)
                renderSelections()
                console.log(filters);

            })

    $(".dropdown-options--list.multi")
        .on("click", ".dropdown-options--list-item",
            function () {
                var filterName = $(this).parent().data("option-for");
                var selectedOption = $(this).data("option");

                updateMultipleSelection(filterName, selectedOption)
                renderSelections()
                console.log(filters);

            })

    function updateSingleSelection(filterName, selectionOption) {
        filters[filterName] = selectionOption
    }

    function updateMultipleSelection(filterName, selectionOption) {
        if (filters.hasOwnProperty(filterName)) {
            addOrRemove(filters[filterName], selectionOption)
        } else {
            filters[filterName] = [selectionOption]
        }
    }


    function renderSelections() {
        console.log(selectionRow);
    }

    function addOrRemove(array, item) {
        let exists = array.includes(item)
        if (exists) {
            return array.filter((c) => { return c !== item })
        } else {
            const result = array
            result.push(item)
            return result
        }
    }




});
