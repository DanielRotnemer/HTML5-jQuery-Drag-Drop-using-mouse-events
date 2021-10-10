var mouseDown = false;
var startX = 0;
var startY = 0;

$(window).on("load", function()
{
    $(".drag-element").on("mousedown", function(event)
    {
        mouseDown = true;
        startX = event.pageX;
        startY = event.pageY;
    });

    $("body").on("mousemove", function(event)
    {
        if (mouseDown == true)
        {
            let movX = event.pageX - startX;
            let movY = event.pageY - startY;

            let left = parseInt($(".drag-element").css("left").split("px").join(""));
            let top = parseInt($(".drag-element").css("top").split("px").join(""));

            let destTop = top + movY;
            let destLeft = left + movX;

            let moveTop = true, moveLeft = true;

            if (destTop + $(".drag-element").height() > $(".drag-element").parent().height())
            {
                moveTop = false;
                $(".drag-element").css("top", ($(".drag-element").parent().height() - $(".drag-element").height()) + "px");
            }

            if (destLeft + $(".drag-element").width() > $(".drag-element").parent().width())
            {
                moveLeft = false;
                $(".drag-element").css("left", ($(".drag-element").parent().width() - $(".drag-element").width()) + "px");
            }

            if (destTop < 0) {
                moveTop = false;
                $(".drag-element").css("top", "0");
            }

            if (destLeft < 0) {
                moveLeft = false;
                $(".drag-element").css("left", "0");
            }

            if (moveLeft == true) {
                $(".drag-element").css("left", destLeft + "px");
            }

            if (moveTop == true) {
                $(".drag-element").css("top", destTop + "px");
            }

            startX = event.pageX;
            startY = event.pageY;
        }
    });

    $("body").on("mouseup", function()
    {
        if (mouseDown == true)
        {
            let left = parseInt($(".drag-element").css("left").split("px").join(""));
            let top = parseInt($(".drag-element").css("top").split("px").join(""));

            if (left > $(".parent").offset().left && left < $(".parent").offset().left + $(".parent").width()
                && top > $(".parent").offset().top && top < $(".parent").offset().top + $(".parent").height())
            {
                let draggedElement = $(".drag-element").detach();
                $(".parent").append(draggedElement);
                draggedElement.css("top", (top - $(".parent").offset().top) + "px");
                draggedElement.css("left", (left - $(".parent").offset().left) + "px");
            }
            
            mouseDown = false;
        }
    });
});