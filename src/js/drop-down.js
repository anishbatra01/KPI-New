$(document).ready(function () {
    var filters = {}

    let filterCache = localStorage.getItem('filters')
    if (filterCache) {
        filters = JSON.parse(filterCache)
        renderSelections()
        if (filters.condition) {
            checkTheBoxes()
        }
    }
    // Handler for .ready() called.
    $(".fancy-drop--header").click(function () {
        $(this).closest('.fancy-drop').toggleClass("__open");
    });

    let selectionRow = $('.selections-row')
    let timeSelections = $('.time-range-selection')
    let regionSelections = $('.region-selection')
    let segmentSelections = $('.segment-selection')
    let conditionSelection = $('.conditions-selection')



    $('#show_date_picker').daterangepicker({
        "autoApply": true,
        "autoUpdateInput": false,
        "startDate": "03/29/2022",
        "endDate": "04/04/2022"
    }, function (start, end, label) {
        let timeSelected = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD')
        updateSingleSelection('timeRange', timeSelected)
        // console.log(filters);
    });



    $(".dropdown-options--list.single")
        .on("click", ".dropdown-options--list-item.text-option",
            function () {
                var filterName = $(this).parent().data("option-for");
                var selectedOption = $(this).data("option");

                updateSingleSelection(filterName, selectedOption)

                // console.log(filters);

            })

    $(".dropdown-options--list.multi")
        .on("click", ".dropdown-options--list-item",
            function () {
                var filterName = $(this).parent().data("option-for");
                var selectedOption = $(this).data("option");
                var checkbox = $(this).find('input[type=checkbox]')
                checkbox.prop("checked", !checkbox.prop("checked"));
                // console.log($(this).find("input:checkbox"));
                updateMulitpleSelection(filterName, selectedOption)

            })

    function updateSingleSelection(filterName, selectionOption) {
        if (filters[filterName] === selectionOption) {
            filters[filterName] = null
        } else {
            filters[filterName] = selectionOption
        }

        renderSelections()

    }

    function updateMulitpleSelection(filterName, selectionOption) {
        if (filters.hasOwnProperty(filterName)) {
            if (filters[filterName]) {
                filters[filterName] = addOrRemove(filters[filterName], selectionOption)
            } else {
                filters[filterName] = [selectionOption]
            }

            if (!filters[filterName].length) {
                filters[filterName] = null
            }
        } else {
            filters[filterName] = [selectionOption]
        }
        renderSelections()
    }


    function renderSelections() {
        let somethingSelected = isSomethingSelected()
        if (somethingSelected) {
            $('.dashboard-grid').addClass('__selection-open')
            for (const key in filters) {
                if (Object.hasOwnProperty.call(filters, key)) {
                    if (filters[key]) {
                        createSelectionElement(key, filters[key])
                    }

                }
            }

        } else {
            $('.dashboard-grid').removeClass('__selection-open')
        }

        localStorage.setItem('filters', JSON.stringify(filters))
    }

    // let timeSelections = $('.time-range-selection')
    // let regionSelections = $('.region-selection')
    // let segmentSelections = $('.segment-selection')
    // let conditionSelection = $('.conditions-selection')
    function createSelectionElement(key, selection) {
        switch (key) {
            case 'timeRange':
                {
                    $('.time-range-selection').empty()
                    var temp = document.querySelector('#selection-pill-template');
                    var pill = temp.content.cloneNode(true).children[0];
                    pill.querySelector('.__text').textContent = selection
                    pill.dataset.value = selection
                    pill.dataset.for = key
                    pill.addEventListener('click', () => removeSelection(key))
                    $('.time-range-selection').append(pill)
                }
                break;
            case 'region':
                {
                    $('.region-selection').empty()
                    var temp = document.querySelector('#selection-pill-template');
                    var pill = temp.content.cloneNode(true).children[0];
                    pill.querySelector('.__text').textContent = selection
                    pill.dataset.value = selection
                    pill.dataset.for = key
                    pill.addEventListener('click', () => removeSelection(key))
                    $('.region-selection').append(pill)
                }
                break;
            case 'segment':
                {
                    $('.segment-selection').empty()
                    var temp = document.querySelector('#selection-pill-template');
                    var pill = temp.content.cloneNode(true).children[0];
                    pill.querySelector('.__text').textContent = selection
                    pill.dataset.value = selection
                    pill.dataset.for = key
                    pill.addEventListener('click', () => removeSelection(key))
                    $('.segment-selection').append(pill)
                }
                break;
            case 'condition':
                {
                    $('.conditions-selection').empty()
                    var temp = document.querySelector('#selection-pill-template');
                    var pill = temp.content.cloneNode(true).children[0];
                    let displaySelection = selection.length > 2 ? `${selection[0]}, ${selection[1]} +${selection.length - 2} more` : selection
                    pill.querySelector('.__text').textContent = displaySelection
                    pill.dataset.value = selection
                    pill.dataset.for = key
                    pill.addEventListener('click', () => removeSelection(key))
                    $('.conditions-selection').append(pill)
                }
                break;

            default:
                break;
        }
    }

    function checkTheBoxes() {
        let selections = [...filters.condition]
        $('.dropdown-options--list-item input[type=checkbox]').each
            (function () {
                let optionName = $(this).closest('.dropdown-options--list-item').data('option')
                if (selections.includes(optionName)) {
                    $(this).prop('checked', true)
                }
            })
    }

    $('.clear-all-button').click(function () {
        filters = {}
        $('.conditions-selection').empty()
        $('.segment-selection').empty()
        $('.region-selection').empty()
        $('.time-range-selection').empty()
        $('.dropdown-options--list-item input[type=checkbox]').prop('checked', false)
        renderSelections()
    })


    function removeSelection(key) {
        filters[key] = null
        switch (key) {
            case 'timeRange':
                {

                    $('.timeRange-selection').empty()

                }
                break;
            case 'region':
                {


                    $('.region-selection').empty()

                }
                break;
            case 'segment':
                {
                    $('.segment-selection').empty()

                }

                break;
            case 'condition':
                {
                    $('.conditions-selection').empty()
                    $('.dropdown-options--list-item input[type=checkbox]').prop('checked', false)

                }
                break;

            default:
                console.log('reached default');
                break;
        }
        renderSelections()


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

    function isSomethingSelected() {
        return Object.values(filters).some(el => el !== null)
    }
});


// window.addEventListener('click', function () {
//     console.log('hi');
//     if ($(this).hasClass('fancy-drop')) return
//     if ($('.fancy-drop').hasClass('__open')) {
//         $('.fancy-drop').removeClass('__open')
//     }

// })