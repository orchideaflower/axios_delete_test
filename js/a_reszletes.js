$(document).ready(function() {
    // import axios from 'axios';
    let $gData = new Array();
    let $win_width = $(window).width();

    let $check_tcp = $('input[id="inline_tcp"]').prop('checked');
    let $check_dns = $('input[id="inline_dns"]').prop('checked');
    let $check_proxy = $('input[id="inline_proxy"]').prop('checked');
    let $check_browsing = $('input[id="inline_browsing"]').prop('checked');

    // $.ajax({
    //   type: 'GET',
    //   url: "http://localhost:3000/allPorts",
    //   dataType: 'json',
    //   success: function (data) {

    fetchPortCells();
    function fetchPortCells() {
        axios
            .get('http://localhost:3000/allPorts')
            .then(response => {
                $('#theBody').html('');
                // console.log(response);   OK
                let $theportCells = new Array();
                $theportCells.push('<tr>');
                $.each(response.data, function(key, portValue) {
                    if ($win_width < 960 && key == 9) {
                        $theportCells.push(
                            '<td align="center" style="width:4%" bgcolor="#b3d0e2">' +
                                portValue.portNumber +
                                '</td>'
                        );
                        $theportCells.push('</tr><tr>');
                    } else {
                        $theportCells.push(
                            '<td align="center" style="width:4%" bgcolor="#b3d0e2">' +
                                portValue.portNumber +
                                '</td>'
                        );
                    }
                });
                $theportCells.push('</tr>');
                $('#theBody').html($theportCells);
                return;
            })
            .catch(error => {
                console.log('axios GET error', error);
            });
    }
    //  /END - portok beolvasása és kitevése táblázatba

    // Checkboxok tesztelése
    function checkboxTest(id) {
        $(id).click(function() {
            if ($(this).is(':checked')) {
                console.log('true');
            } else {
                console.log('false');
            }
            return;
        });
    }

    var id = '#inline_tcp';
    checkboxTest(id);
    if ($check_tcp) {
        $('#theBody').on('click', 'td', function() {
            $(this).toggleClass('port_disable');
            console.log('click_on WWW: ', this);
        });
    } else {
        $('#ports_table').prop('disabled', true);
    }

    function notCheckedPorts() {
        $('#theBody .port_disable').each(function() {
            $gData.push($(this).html());
            // $gData = $($("#theBody")).find(".port_disable").html();
        });
    }

    const baseUrl = 'http://localhost:3000/testedPorts';

    function destroy(notChecked) {
        var i;
        console.log(notChecked);
        alert('destroy');
        axios.get('http://localhost:3000/allPorts').then(response => {
            console.log(response.data);
            alert('beolvasás');
            for (i = 0; i < notChecked.length; i++) {
                $.each(response.data, function(key, portValue) {
                    console.log(
                        'Egyezés előtt portValue.portNumber: ',
                        portValue.portNumber,
                        'notChecked[i]',
                        notChecked[i],
                        'i',
                        i
                    );
                    if (portValue.portNumber == notChecked[i]) {
                        console.log(
                            'Egyezéskor portValue.portNumber: ',
                            portValue.portNumber,
                            'notChecked[i]',
                            notChecked[i],
                            'i',
                            i
                        );

                        alert('most lesz TÖRLÉS');
                        axios
                            .delete(baseUrl + '/' + portValue.id)
                            .then(response => console.log(response.data))
                            .catch(function(error) {
                                if (error.response) {
                                    console.log(error.response.data);
                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                }
                            });
                        alert('most VOLT TÖRLÉS');
                    }
                });
            }
        });
    }

    $('#start').click(function(e) {
        e.preventDefault(); // így nem ugrik rögtön a link miatt

        $check_tcp = $('input[id="inline_tcp"]').prop('checked');
        $check_dns = $('input[id="inline_dns"]').prop('checked');
        $check_proxy = $('input[id="inline_proxy"]').prop('checked');
        $check_browsing = $('input[id="inline_browsing"]').prop('checked');

        if (!$check_tcp && !$check_dns && !$check_proxy && !$check_browsing) {
            alert('Legalább egy mérésnek AKTÍVnak kell lennie!!!!!');
        }
        if ($check_tcp) {
            // notCheckedPorts();
            // console.log($gData);
            // destroy($gData);

            const disabledPorts = getDisabledPorts();
            getAllPorts()
                .then(response => response.data)
                .then(ports => {
                    return (portIds = ports
                        .map(port => {
                            return disabledPorts.indexOf(port.portNumber) === -1
                                ? null
                                : port.id;
                        })
                        .filter(portId => portId));
                })
                .then(portIds => {
                    Promise.all(
                        portIds.map(portId => deletePort(portId))
                    ).then(() => {
                        console.log('promises after');
                        console.log('delete completed', portIds);
                        fetchPortCells();
                    });
                });
        }
    });
});

function getAllPorts() {
    return axios.get('http://localhost:3000/allPorts');
}

function deletePort(portId) {
    return axios.delete(`http://localhost:3000/allPorts/${portId}`);
}

function getDisabledPorts() {
    return $('.port_disable')
        .toArray()
        .map(element => {
            return element.innerText;
        });
}
