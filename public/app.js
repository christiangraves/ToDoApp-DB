$(function(){

    const state = {
        index: 0
    }

    //GET request for saved items and render them
    $.ajax({ url: "/api/showList", method: "GET" })
        .then(function (theList) {
            renderItems('#itemList', theList);
            console.log(state.index);
        });

    //render function for saved items
    const renderItems = function(outputElement, dataList){

        for (state.index; state.index < dataList.length; state.index++) {

            const output = $(outputElement);

            const thebutton = `<button class="newButt" buttindex="${state.index}"><i class="fas fa-times"></i></button>`;

            const listItem = $('<li>')
                .addClass('allItems')
                .attr('item-index', `${state.index}`);
            
            listItem.append(
                $("<h2>").append(`${dataList[state.index].item} ${thebutton}`)
            );

            output.append(listItem);
        }
    }
    //Rerender function to render items after change
    const rerender = function(){
        state.index = 0;
        $('#itemList').empty();
        $.ajax({ url: "/api/showList", method: "GET" })
        .then(function (theList) {
            renderItems('#itemList', theList);
            
        });
    }


    //submit listener and POST for new Item and to render to page
    $('#submit').on('click', function(event){
        event.preventDefault();

        const newItem = {
            item: $('#enteredItem').val().trim(),
            indexNum: state.index
        };


        $.ajax({ url: '/api/addList', method: 'POST', data: newItem }).then(
            function(){  
                    const displayItem = $('#enteredItem').val().trim();
                    //console.log(data);
                    renderItem('#itemList', displayItem);
                    $('#enteredItem').val('');
                    
            });
        //Single Item Render function
        const renderItem = function(singleOutputElement, theItem){
            
            const singleOutput = $(singleOutputElement);
            
            const singleListItem  = $('<li>')
            .addClass('allItems')
            .attr('item-index', `${state.index}`);

            singleListItem.append(
                $("<h2>").append(`${theItem} <button class="newButt"><i class="fas fa-times"></i></button> `)
            );

           singleOutput.append(singleListItem);
           state.index++;
           
        }

    });
    //
    $('#itemList').on('click', '.newButt', function(){

        const deleteButt = $(this).attr('buttindex');
        const j = parseFloat(deleteButt);
        $.ajax({url: `/api/deleteList/${j}`, method: 'DELETE'})
            .then(function(data){
                console.log(data);
            });
        rerender();
    })

});
    