'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const solutions = [
  {
    id: 1,
    title: 'Image to 3D',
    subtitle: 'Upload photos, get 3D models',
    stat: '2 Min',
    description: 'Simply upload product photos and our AI instantly converts them into detailed 3D models ready for AR.',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUTEhAVEhUVFhcVFxUVFRUYGBUXFxUWFxUXFRUYHSggGBolGxUYITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OFRAQFy0dHx0tKy0tLS0rLS0tLS0tLS0tLS4rLy0rLS0rLSstLS0rLS0tLSs1KystLTEtKzcrLysrK//AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgQFBgcDAQj/xABOEAACAQIDBAUGCQcKBQUAAAABAhEAAwQSIQUxQVEGEyJhcQcygZGhsRQjQlJicpLB0TNDU7KzwvAkVGNzdIKToqPSFRc0g+EWJTVE8f/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACkRAQACAQMDAwIHAAAAAAAAAAABEQIDITESQXEEUWHw8QUTFDKBscH/2gAMAwEAAhEDEQA/AMfiiKXFEUCIoilxRFAiKIpcURQIiiKXFEUCIoilxRFAiKIpcURQIiiKXFEUCIoilxRFAiKIpcURQIiiKXFEUCIoilxRFAiKIpcURQIiiKXFEUCIoilxRFAiKIpcURQIiiKXFEUCIoilxRFAiKKXFFAqKIpcURQIiiKXFEUCIoilxRFAiKIpcURQIiiKd7P2fevvksWnuv8ANRSxH1o0Ud5irxsfyX3mhsXeFgfo7cPc9Leap+1QZ5Vl2L0Gx+Ig9V1Fs/nL0rp9FPOb1R31p2B2FhMIJw2HUuB+UY5rp8HfRT3CBTrCY5rijOCrwMysIIPHxHeKzYrWyugGz7ZAvNcxFzTRptofqopk+ljUpf6H7OOnwS2PqllPrBp3tFnCsU1YAkA7iY0HdTTo/tO5dtdY9tlBLZZHycxjSZ3cxUsQ1/oPs/PlyXbUkAMLwyyfryfZSb/kuwwPZxV4eItn7hU9tHC2ruVyJZCGVgY1GsHgR3GphLyus5hoNasSM7veT/CKcvwy4GkAAohJJ3AAami55LWnTGADvsyfZcq8fAlnrig6weYxGqiZHhMa91ObWLFwgLviT3d3jPupAzLEeTtkMHHW9d2a2y/vGg+TPFRK37B8TcH7prR8ds5bwKMoK8WIBj6nJu/hPqcWCEUWzplAA+kOB8edXcZO/k5x444c/wDcf77dcH6BY8fJtHwur+9Fazi8zCEE9+4D7z6K4bK2UFlnZrlwHezNlAiVhJjSSJMnQ61LkZU/QTaQ/wDrg+F21/upqeiW0Jj4I89xQ+5q297q5SxYADfz5RHOdIqJxGAxFy9bdbnVKJBUiWKnUnfCnTvq2MjudFseN+Du+hZ900zbZWJGhw94f9p/wr6Buwo46cTUUuJu3LoRbTC3Em6dAOQWd591LGJ/8MxH83vf4Vz8KUux8Ud2Fv8A+Fc/Ct5tWsm+47cO0R9wFLe63zSfV99Sx8/4nZ962JuWbiDm9t1HrIptFfQrMSO0u/gdfXVC6ZdD7ZVr+GUIwlmtr5rjeSo4N3bj41bGbxRFLiiKoRFEUuKIoERRS4ooFRRFLiiKBEURS4oigRFEUuK0boBsqzYtri7y571yTZUierQGOsA+cx3HeBu3mgr+yOgGPvAOyLhrbbmvkqzD6NoAufSAO+rbsrydYK0Q2IvPiSPkKvV2574JY+sVO3NrOWzG2TzOaT6t5p1hsTauaBoPI7x6KzYaXsY1gKtiwq2g0ZbKhMqkGSUHnGQNRrqacjEZhNeYi2RUfeJ4b6yHdy7THG45VAzRvETHOl2L6uoKmfuO4g94OlRPSLZzXUGQwysHWdxI4HxBNBNFgwkE+g/duqN2Tibtq5ctvb+KLFkcQR2tWBG8akxTWziyiSFYQNVO/viN9I2ft1Ll1k07KqfS0/hUtUjtUtkZ7MZ4JA4NA0Bj2GuXQi5fKub+jSDl5SJrsbkA5de7vptcx3Vrmza2xB70/wDB1HpHGraLRir0rHKaq3RZMQmIvG9IVzNueKgnd+HfRs7awxLZVaVGrRx5L4Hj3CONWDGKCmWYjUHkRuP8eFInuHwxAjSqd032rettbFqCzMBzOunDcK54fbrG6bII6wGI3gcz3ge2rPh8KgUSMx3lmgknmTVvqDrAvlRQY0A8N1e3r4Go5R/Ht9dQW0Md1LQTCnVe7mv3j08qNnYo4gwrEIPOYbz9FTw7z6tdQvsEdGMeb+Jvdk5LJGp3Z20WPQCfTVouGNeIqNuXUsgIihVYkmOLRx5mAde6ud3aIjmToFG9idwH8c6sbBOE20lzEGyO1xy751iDUttC6+4AA+s+ED8aiOjnRoWrlzF5c15pVNTClpzlZ7tJ7zUrbw/V/G4lwNYVQZ8SZ/j7pEhngMJcRzcvXAzEQqL5tsHf4sefDdXfFXmAJW2znkIE+kkCpPqUjMgkEAho5iml64BQRmEF1lDXhkJ1yAzl7pG/x91KZR8kz9E/xI9NIxG0RmyKCzHuOVRzZo9gk0pEGpZpJ7iAI5TQY70n2f1OJuIBCk51+q2segyPRUVFaR5Rtl5rS3wJNswx5o3PwMes1nUVsIiiKXFEUCIr2lRRQLiiKVFEUCYoilRRFAkitTwjZbKECewiLHIKAAOWo91ZdFaT0TxS3cMoHn24BHEwZU/dUkSqbMxGWTcQN8zKSB3Zp9tR1u+esNtwbV0aj6W7tKflARu368KseGvh1DA/xxFMtuYIXEkaMuqsN4I3ej7qzIXhMfmlX0Ye0cGHcaReFRWFxGZBdiCs5lE7gYuAkjU6E+IFS1zdUEcmHCuzBmAaCVDQCYiY4cPVXHH7Q6soD8qfZGntp29V3prhbly2nV+erggieRHDxoJliCMw46+GgrOek917ONNy32SVUwBo51nd3irZsfGObcXBldeyw5EcxwotXrLuVZQW3AmNPwNSJEl0fxBe0rvoWG48OczS7+UuI49kjnOlUna+072EuFMxa23aUkyVPFZ3keNSPRLanWPnc7pCLvJJ0JjuB9tSYpVnwGzLOFdnWfjTMngQNV9Wo568qkm2ihGrADj3DvqL2piM1tlKtqNIBkEagjvmqV0fxN/r/jwwVTuIIDGdJngN9LF8XY1sMcWVh43H5KGDmIO5tAe4SN9SVvaAjfTdcYSs1nW3dt3LN9ksgsoGaCD2RvPoEb+VXwi7be2a2LHVI0HeTrCjmx9w3n1kSGwsEuGtLaDFisgkne0mfbTfYWJUWlKnNmAYtxYkbz/GlRvSLapsnrPknzu47p8CI9XfTgTW3Za22XfvHiNQaYeTq1fuub2ITKiSBPE8Y5zp6u+uPRvaYxUt+bXT67cj9EceZI5EGyY3awUC3IGk8tD/APlSfdUhtDby2+ypy7gO8mAo9ZFcf+G3MVcDXcy2lMkHSVHCN+vuqtnZxxGNsMWixa+PuHmyEdWvpaD4KavWz8V1wIXzc5XxiJk0jlSmLvxyoNwHKuL2wOFd8djFXQEADjzNV/E7amRbGaPu38gPXPdXRlI3RTFCc7DhpHqpk+MxB4qs7tZ8NwH315hsVcXQgONdQe1ppqDH31A5xuEW4jIw7LqVI7iI9BrF8ZhWtXHttvRip74O/wBO/wBNbbaxKOOyfEcR4is88oezgt1bwGlwQ31lGh9K/q1qBT4oilRRFUJiilRXtAqKIpcURQIiiKXFEUCIp7sraL2XzLuO8cxxprFEUGl9H9pI5LI4hj2lJghiYGnA7hG7kTFWF9RWN7OulLttxpldT6AwNbLWaFR2UcuIxFs7pVojgwKn9WpiwfiV5qMv2Tl+6om8MmPP9Jb/AFWH4mpZR2XHJveAfeTWewZm7XHGX1VczHQR7TA99cbt2DVd6W7TyoqDezj1Lr7wKgcdJfMLoxVwPOHygOBHHuqrdHmvXLmVQ1xm1AAJY+gVO7JW9jIsWUzvvk6KqnQs7cBWkdHth2MBZ6uz27jflLxHac8h81BwHp31Oyq3g+hnXHNjwAgAy2kbtk8TcYeaO4Ge8bqsuGwWHsjLYsJZXkigE/WO8nvNd2k15lq0ObCk5a7hK9yVaQ16kch6qZYvYeGuGXsIxgiY1g7xI4VL5aSVpQjcLs23aUJbXKo3CSY9dM9r7JS8jW2JAYQSIn0SKmyK43BWRVtj7F+CDLbuMRJJmOMcN3Co3pbi3ADg6rod4kb4I4EcPTVvvJUDtnChlI7jUtXXZeJdMAjnW5dBuNG8J+aH2dfFjVy6JlrOAtZ5zlM7DjmuEuR49qKqPRJFxVx0uKeot21GTcGjshD9HTdxirXt3FFLLFfkqSB9Lco9fvq4rKLxOIa857XYUwYmCeKj6I3E7ydK47SxyWUzGFAjQc9wygb57qcWLAt21T5oieM8TOupOtRuw8J8IxL33Ga1hzktg7mu/KeN3Z3Dvmtsu2zsLjL8NAw6cM4lyPqzC07xGyr9tcyXetgarADHnl4TU4zUkvFKFdw2KDgOmjARHh8luRHfrNRfTZxcwobk6sPSGU++pDCgNib9xPNLASOLqoDkQRxgHvBqC6U4gC0yc77AeCkk+o1YFPiiKXFEVoIiilxRQLiiKXFEUCIoilxRFAiKIpcURQIitg2Vfz2bb/ORT7NayKK0noVfzYVR80lfUdPfUkN+kS5cRh3jexQ+DKfvAqR4v9VT+sPuFMemoi0r/MuW23cM4B9hNPEO7vRh4nskffWRVdpYoKTJiOdR2yOi13aF3r2Y2cKunWkavG8WVPnH6W4d+6pTo5gcPfuPicSpuoHZLdo6WwytBNwfL5gbtdauVzHZ47QgCABAAHIDgKyOuz8PZw9vqsNbFtOPFnPznbex7zXXNTVLgrqGqwOopapSA1LD1QrLQRXjPSM9Ao0krXrNSc1BzcVwuU4auF01mQzvmojHnSpW9UVjxoaxKmnRPGlLmQn8riCI5Ktkkf5mq09INVRfnXbQ9TBj+rWb4fEZMZY5dfb/AMzKprR9q63bA/pGb7Nt/wARW8R7jAApJBEAndXLocIwlr6Qznxclj76Rt+5kw95su6254fNMU/2PZyWba8kUeoCtQh6xqsbb2pcebVgka5XvcE4MEnznE+A14iKst0wCeQrM22yyIFNvMxm4cxhR1pL+aup87ifRVE+mJSzaARQpAIIJJW2wJDZmO8zJHE7u+qbtPF9Y2k5VmJ3kkyzHvJoxmNuXT22kDcoEKPBRpTaKsQERRFLiiKoRFFLiigXFEU82Thhdv2rRJAuXEQkbwGYAkTx1rSW8mWCDBDjLoZtQpNkMY3wuWTQZVFEVq2G8mWBuCbeNuOBoSjWWA8SFrsPJPhf5zf/ANP/AG0GRxRFa9/ymwv86v8A+n/to/5S4X+dX/8AS/20GQxV18nt7s3U5EN6xH3Vax5JML/Or/8Apf7akdieTrD4ZiyYi82YQQ2SN88FoK50pw3WYW6o3lGjxjT2022TiRctWXmZyn7Slf3q0O70WtMCDcfX6v4VH7P8n9i1bW2t+6QsQTknQgjh3VmhTug9kJZupxXE3p9LSPYRVjNlDvVT4gGl4voxawQuXUvO3XXVJVssBikHLAnUIPVTZcQKqFtgbJ/Nr6BHupH/AA21wBHgze6aWLwpXXUVyOzxwdh6QfeKQ2Bfhc9a/hTnraULlKQxOGvD5p9JFIZLo/Nk+BBqSz16HqUqHa+w85HH90/dSRjV5x46e+pwNQyKd4B9FOkQ/Xg7jSHaak3wNo/IHo091cH2UnAsvdMj21JxEY4qOx1rQ1Ptsw8HHqI9smmt/Zdz6Pr/APArE4yKFhrKjHYfMJBuD0EAsp+0oq9YhpxNocrd1vbbA95qr7f2bds3cPcOWDiLS6E5pLceERNWe0ZxLfRsJ/nuP3fQFXGFNulL/EFde21u3u+fcVfcanrA0FV7b7S+HT519T9hWfl9GrEm6twhptu4VsXSN+RgPEiB7SKzDav5Z43A5R/dAX7q0nb5+LC/OuJ/lYOfYprL7tzMxbmSfWZpARFEV7NE1oeRRFezRNB5FFezRQP+jJ/lmG/r7X7Ra3PaODvPftkJaNpCGJLlbhcEx8gyqySBIknhxwnowf5Zhv6+1+0Wt76QbYTC2TdYZtQqruzMZgTwEAn0UDTo1se7ZyG4LalLCWItktnymc7kqvgBrEnWrCKzZfKLdnW1bA5Qxjlrm1rq3lCcAki2vLstp49rWs3A0UUoVmSeUG80BWtzx+LYaRwBb2yYpLdPsTNwSJtjzRbGvZnsado06oKaiK9rHsb5RsSMgW4e1vOVBl7m7Nd7HlIxGksNWgSi8N57hp306oKa4K9rMLHlNeJItHWBowmN+5vHlUnsvyjo7DrLORCQM6knKCYDMD8meNOqBOdOLVtsOBcVmHWLomeZhvmax7Kops4XcLrWzyzlf8ulaJ0nb4kfXHuNUfaTKck6gXE395j3mkhuMFc+RiZ7mCn2gUoW8UP0b+Ej3mnfwGwfzSg817J9axSW2co825cXwfN+vNQNWxGIXzsOfQ0+4Vx/42o89HTvYD8Z9ld8It454vDsuVGZJkADeVI4k8KcFcTxW24+sR7Cv30Da1tqwfzgH1gV9pFO7WMVvNdW8CD7qZ3sOD+UwYPeAp9xmoTbz4O1Ze4LTZh2QJdRmmIM8jVsW0XqWt+snwe1cQtxVe9AZlQhGPxbN5sjcdx9RrRNiYNUs3cXjcY/UWiFyoEBdjGhZvrAAAiSd/OiZF2lC4Kj8ePi7GJwma9YxCllD9l0I56ajfw4bzNMztC4vnWLg8ACPeKWJ2aSTUMm2U3EkeKt+Fd12jbP5xftAe+pYjemBBFheJxCR/dDN91dsFrevGNwtJ6kzfv1F7dfrMVhVVlIRmuN2hPmMqwOOpqV2avavNzunl8lEX92oGeOhsXh1jcLlzdyCr+/ViFVzD9rHtPyLA5fLc8vqVZBVgV/pXfyqPorcf0hMo9r1m01eOm96A45W0X7dwk+y3VEmrAXNE0iaJqhc0TSJomgXNFImvaB/wBFz/LML/aLP7Ra3npTsX4XYNsEKwYMpO6QCIPcQTWBdFj/AC3C/wBos/tFr6WAoMAxMIzK0gqYOhiVMGD6Ka411ZRlYGDP4aeNSO2F/lF3+sufrtTA2wd4HH31yUzF2LYZdGRgZ494njrUfj8c4Yr1n5NjGvyZMCfVTuPi7n1v3qnMJs7Zzy7KpYk5pJOu46TzoKK+JJJYuZYz6qd28a/BpmD6Bwq8NsrZv6Be7sffFM8R0ewTDs22XvDED1TVFct4tiDIH0dBpzjlWg9D9ivine0rBRKdYx4WlVA2UcWOgH1ieFVC90Zyhmt3TCKzZW1kKpYgEcYFaX5Jf+ov/U++1SCV46Uj4gD6a+5qou0MCWUw7DcTliYB1y5tJq7dMrwSwCSB8Yo1Pc1U65iwVMHgfdWpRy2a7lZYEamJ0JWeySBuJEGO+njsYrlhL6lFP0V9wpwjA99QRGDxRV7oIIHWDtQcuZkU5c26eMd4qYS9TK5ZR7zKwPZW28SQC2Z4LAb4yjfTsIBSAp7tQvwJMRYuWbm5rl3dvB61ipHsqXexPGKhMDZuByq54WRdLlSDc7JBtxwIM+rjNLEXg+gpVwz3+tVTKqRAncC3zj+FW3ZFrqbdyy9m1fsXfPsuSVJEaiQQNw4cByotk1zxWIyKWOgUEk8gNTVsdMVtC5iHZVy4dLBFu3btgFRmRGJOgk6gaREd9I6rEjdctv4hl/Go/Z9xluXQ6Mhcq4DbyuRVB9aGphbtTkMrty98vDK/1WRv1opnnwzgzh3WCVMI4gjQiU0qYe8KYbDu9hu+7eP+q8UoRtjZeAF4XUfLcUEDM5Oh3jKxmna4a6qkWzauSzN2mZdWYmNFPOppgrbwG8QDTdtn2P0Sj6vZ91KEHsLD3hiLzXkRGK2wBbYsMoLwZIGszpVhqOwFlBdu5QdCimWLahZ47vO3VImqM/6c3tSPnXPYlsD9ZjVQmpvpfiMzprwa5/iXGI9gFQM1Y4C5omkTRNULmiaRNE0C5opE0UEj0V/63C/2iz+0WvpoV8x9Fj/LcL/aLP7Ra+lDfFBh+2v+pvf1lz9dqYT7z76edIiUxV4MCp6x2AIiQXYgjuPOo0Xfv99clMj5j/X/AHjXPZ2LVQ3nE5m0VWPyjyFdU81vrfvU4u6KDBOsbyRQLO0DGltyO8ZefziOddExl0iAg9Lj90NSLrQqMqjUmYA7q74i8ZQhhECR3yYoFL8IcMvZXMCp7LkgEQfOy8DV98kgIxOIB3hTy+db5E1Q7uKUXc3WCIXTdBgT41fvJSjm9fvZT1bBgr8CcyaDnuNWORIeW/8A+OH9ot/qvWGWcZdTzbjr4MQPVW4eW1v/AG4f19v9V6w/A4trVxbiBSyGQHUMvpVtDW542RbuiOE2tiI6o5bX6W6vYA+juL+jTmRWu7L2ctlQJzNHaciJ5wOA7qzLB+UPaeJZcPh8PZF19AwDEADe0EkKo4kz4Vetp7UXZ2CD4i6191AWTo1662pgfJEyYG5R3V8D1+XqM5jCai+MYm5ny9mjGEXPt3M+ne1LWG6q441csmYCTAAIB7tT6++oDD9K8K355R9bs++vPLBibdzDYV7bq6m4xDKQQQU5issr6H4bE/p8b+f7cNf98tntbVRhKsD4Ga57LxQPWa/nG9y/dFY6jEagkeBipfYV3GXHyWbrAnUkh2WfpFVaN288q9s7RcuTW1uClgqd8Ed9ZYOleLtsVfKxUwcysp8YMET3gVIYfp2fl2j/AHWB9hiqLps6xbz3iBrnCjeYVUWFE7hJYxu1NPglUnZXS3DjPmYrmcsJB4gcR4VPYbb1h/NuofBhUEjjcIzowVsrEEKeRqN2Rs9lGZCwtsAVV3ztmJYuxbkZEDx3TFPn2gApM7gT7K82PeHUWh/Rp+qKB1bnjSmNeZxSLj6E1Qz2Tr1jc7jf5ex+7TrHXctt2+arH1Ammuwh8Sh+cM32jm++lbZb4oj5xVftMAfYTUGV9Im+PZfmKifZQT7ZqNrttC9nu3G+c7H0FjFcK2PaK8ooPaK8ooPaK8ooJDo0f5Zhv6+1+0WvoC7mNfP3RpgMZhiTAF+1JO4DrFr6G+G2P01v7a/jQV7auwLV/wDKWgx+dEMPBhrVUx/QC+NbDE/Rf7m/GtN+G2P01v7a/jXvw2x+mt/bX8alDHcP0F2kwI6lU1mXuLG/6OY1L4byb4pgOsxNtBxCoz+0kVpgx1j9Nb+2v40r4dY/TW/tr+NOmC1Iwvkzs/nMRefuGRR7ifbUzhOgWz032M5/pHd/Yxj2VPjH2P01v7a/jShtCx+mt/bX8aUOWB2LhrX5PD2rf1Lar7hUlbFNBtCx+mt/4i/jXjY3Dn89b/xE/Gs6k5xF4Rc+aWIi91T8s4J2eoAJPX29AJPmvwrMNhdB8fiSIstZQ77l4FAB3Ie03oEd4rXemPSi3g7AvJkxBzqmQXQu8HtSA26OXGs9x3lYxbCLVi1Z7yWuH0eaPWDXjy1fV5bY6cY/MzEukY6cc5X/AAvWydkYHZOHZ2cLu6y8/nOeCqOXJF9p1rJemnSh8dfzwVtJItIeAO9m+kYHhAHeYvau1sRiXz37zXW4Zjov1VGi+gUyp6X0X5eU6mpPVnPf28GercdMbQebJt2Wuqt0lUadRcS2JjTNcuAqo7zVqbojhhcFk3L4e7ibuHtNCQuS3bdWuJEsDn3gjTWqjgcbdstntPkaCJhToYkQwI4Cnn/qLG5XX4Vci4WZ9dWLABjm3iQANDuFd9XDVyyvCa+vH3ZxnGI3c9nbMe4Ccl7LuzWrJugkbx5yj20/+E4tLR6jObNphbZuoRWW4RGVkBcqSflaFiYPACFw10ISertvIj4xAwHgDuqw7GW/PX4TFWbFzLlKIDbgRqCgBnXjEaAgzoLq3G81MfMbf6Yn+OwpeybGIZXxdu210gAKMMoKkW2yQrXWJUEblBky2ppc1YXNvCW7o64XsReBQlTmCK2rlmOpYkzrBkLpAJau00IqJ9vrj4M3s0V5RXdh3tYu4vm3GXuDED1VIYTpLi7YAFyQNAGUHQe2oiigtmH6c3h59pW8CR+NPH6boyMMjKSpA3ESR3VR6KlDZdk4y01tRbdWAUDskHcKadKMUFtTO7M32UaPaRWTIxBkEg8xofXXW5irjCGuOw5FmI9RNKHIUTXlFUezRNeUUHs0TXlFB7NFeUUBXmQch6qKKAyDkPVRkHIeqiigMg5D1UZByHqoooDIOQ9VGQch6qKKDzIOQ9VGQch6q9ooAKOVe0UUBRRRQFFFFAUEUUUBRRRQFFFFAUUUUBRRRQFFFFAUUUUBRRRQFFFFAUUUUH//2Q==',
  },
  {
    id: 2,
    title: 'AR Catalog',
    subtitle: 'Your entire showroom in AR',
    stat: 'Core Solution',
    description: 'Deploy a complete AR furniture catalog that customers can view in their own space before buying.',
    image: 'data:image/jpeg;base64,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',
    isHero: true,
  },
  {
    id: 3,
    title: 'Fast Setup',
    subtitle: 'Launch in hours, not months',
    stat: '24 Hrs',
    description: 'From photos to live AR catalog in under 24 hours. No technical expertise required.',
    image: '/images/fast-setup.jpg',
  },
//   {
//     id: 4,
//     title: '70% Cheaper',
//     subtitle: 'Professional 3D at fraction of cost',
//     stat: 'Save $$$',
//     description: 'Traditional 3D modeling costs $500-2000 per model. We make it affordable for every piece.',
//     image: '/images/cost-savings.jpg',
//   },
//   {
//     id: 5,
//     title: 'Real-time Preview',
//     subtitle: 'See changes instantly',
//     stat: 'Live',
//     description: 'Update your catalog and see changes in real-time. No waiting, no delays.',
//     image: '/images/realtime.jpg',
//   },
//   {
//     id: 6,
//     title: 'Easy Updates',
//     subtitle: 'Manage everything yourself',
//     stat: '1 Click',
//     description: 'Add, remove, or update products with a simple click. Complete control, zero hassle.',
//     image: '/images/easy-updates.jpg',
//   },
];

export default function SplitScreen() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const images = gsap.utils.toArray('.solution-image');
    const totalSolutions = solutions.length;

    // Pin the entire section
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${totalSolutions * 100}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(
          Math.floor(progress * totalSolutions),
          totalSolutions - 1
        );
        setActiveIndex(index);

        // Fade images based on progress
        images.forEach((img, i) => {
          const imgElement = img as HTMLElement;
          const solutionProgress = progress * totalSolutions - i;
          
          let opacity = 0;
          if (solutionProgress >= 0 && solutionProgress <= 1) {
            // Fade in first 25%, visible middle 50%, fade out last 25%
            if (solutionProgress < 0.25) {
              opacity = solutionProgress / 0.25;
            } else if (solutionProgress > 0.75) {
              opacity = (1 - solutionProgress) / 0.25;
            } else {
              opacity = 1;
            }
          }
          
          gsap.to(imgElement, {
            opacity: opacity,
            scale: 1 + (opacity * 0.05), // Slight scale on active
            duration: 0.3,
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const activeSolution = solutions[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white p-20"
    >
      <div className="flex h-full">
        {/* Left Side - Text (changes based on scroll) */}
        <div
          ref={leftRef}
          className="flex w-1/2 flex-col justify-center px-16 lg:px-24"
        >
          <div className="max-w-xl">
            {/* Small label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm uppercase tracking-widest text-gray-400">
                {String(activeSolution.id).padStart(2, '0')} / {String(solutions.length).padStart(2, '0')}
              </span>
              {activeSolution.isHero && (
                <span className="rounded-full bg-amber-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  ⭐ Core
                </span>
              )}
            </div>

            {/* Stat */}
            <div className="mb-6 text-7xl font-bold text-amber-600">
              {activeSolution.stat}
            </div>

            {/* Title */}
            <h2
              className="mb-4 text-6xl font-light leading-tight text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {activeSolution.title}
            </h2>

            {/* Subtitle */}
            <p className="mb-6 text-2xl text-gray-500">
              {activeSolution.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-600">
              {activeSolution.description}
            </p>

            {/* Progress dots */}
            <div className="mt-12 flex gap-2">
              {solutions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-12 bg-amber-500'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Images (stack, fade in/out) */}
        <div
          ref={rightRef}
          className="relative w-1/2 bg-gradient-to-br from-gray-50 to-amber-50/30"
        >
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              className="solution-image absolute inset-0 flex items-center justify-center p-16"
              style={{ opacity: 0 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Hero glow */}
                {solution.isHero && (
                  <div className="absolute -inset-4 -z-10 rounded-3xl bg-amber-400/30 blur-2xl" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/4 -translate-x-1/2">
        <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">
          Scroll to explore
        </p>
        <div className="h-16 w-0.5 overflow-hidden bg-gray-200">
          <div className="h-8 w-full animate-scrollIndicator bg-amber-500" />
        </div>
      </div>
    </section>
  );
}